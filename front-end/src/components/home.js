import React, { Component } from 'react'
import me from './me2.jpg'
import {Image, Container} from 'react-bootstrap'

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Image src={me} width="100%" roundedCircle/>
      </Container>
    );
  }
}