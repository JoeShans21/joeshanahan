import React, { Component } from 'react'
import {Button, Card} from 'react-bootstrap'
import Calculator from './Calculator.PNG'

export default class Software extends Component {
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={Calculator} />
          <Card.Body>
            <Card.Title>Calculator</Card.Title>
            <Card.Text>
              Simple, Colorful Calculator
            </Card.Text>
            <div style={{ padding: 5 }}>
              <Button variant="primary" onClick={(e) => {
                e.preventDefault();
                document.location.href='http://joeshanahan.com/calculator';
              }}>Go to Calculator</Button>
            </div>
            <div style={{ padding: 5 }}>
              <Button variant="primary" onClick={(e) => {
                e.preventDefault();
                document.location.href='https://github.com/JoeShans21/Calculator';
              }}>Github</Button>
            </div>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={Calculator} />
          <Card.Body>
            <Card.Title>Chat App</Card.Title>
            <Card.Text>
              Chat Application Using Socket IO
            </Card.Text>
            <div style={{ padding: 5 }}>
              <Button variant="primary" onClick={(e) => {
                e.preventDefault();
                document.location.href='#';
              }}>Go to Chat App</Button>
            </div>
            <div style={{ padding: 5 }}>
              <Button variant="primary" onClick={(e) => {
                e.preventDefault();
                document.location.href='https://github.com/JoeShans21/Calculator';
              }}>Github</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}