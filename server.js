const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// fake DB
const messages = []

// socket.io server
io.on('connection', socket => {
  socket.on('message', (data) => {
    messages.push(data)
    socket.broadcast.emit('message', data)
  })
})

nextApp.prepare().then(() => {
  app.get('/messages', (req, res) => {
    res.json(messages)
  })

  app.get('/messages/:id', (req, res) => {
    for (let message of messages) {
      if (message.id == req.params.id){
        res.json([message]);
        return;
      }
    }
    res.json({'Error': 'No room at this id'})
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
