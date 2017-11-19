import React from 'react'
import Router from 'next/router'
import { Button, Header } from 'semantic-ui-react'

import PageContainer from '../components/pageContainer'

const handler = (path) => {
  Router.push({
    pathname: path
  })
}

export default class HomePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from state"
    }
  }

  render(){
    return (
      <PageContainer>
        <div style={{marginTop: '10vh'}}>
          <Header as="h2">Welcome to Dummy Chain</Header>
          <Header as="h3">Simple web visualization of Blockchain</Header>
          <br/>
          <Button onClick={() => handler('/makeChain')}>Make A Chain</Button>
          <Button onClick={() => handler('/joinRoom')}>Join A Chain</Button>
        </div>
      </PageContainer>
    )
  }
}
