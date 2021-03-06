import React, { Component } from 'react'
import {Navbar, Nav, Card} from 'react-bootstrap'

export default class Drive extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Files />
      </div>
    );
  }
}
class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">JoeDrive™</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
class File extends Component {
  render() {
    let link = "http://joeshanahan.com/api/download?file=" + this.props.name;
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Link href={link}>Download File</Card.Link>
        </Card.Body>
      </Card>
    )
  }
}
var fileNames
class Files extends Component {
  render() {
    fetch('http://joeshanahan.com/api/allfiles').then((response) => {
      return response.json();
    }).then(getFiles)
    return (
      <ul>{fileNames}</ul>
    )
  }
}
function getFiles(data) {
  fileNames=data
}