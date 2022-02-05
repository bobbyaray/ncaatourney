import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
      }

    handleSubmit(event) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.state.email, password: this.state.password})
      };

      fetch('user/login', requestOptions)
      .then(response => response.json())
      .then(data => alert(data));

        event.preventDefault();
    }

    render(){
        return(
            <div>
            <h2>2022 NCAA Tournament Pool</h2>
        <Card bg="dark" text="white" style={{ width: '30rem' }}>
        <Card.Header>Login</Card.Header>
          <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={this.state.email} type="email" placeholder="Enter email" onChange={this.handleChange} />
                  </Form.Group>
  
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChange} />
                  </Form.Group>
                  <Button onClick={this.handleSubmit} variant="primary">
                    Submit
                  </Button>
                </Form>
          </Card.Body>
          <Card.Body>
            <Card.Link href="/register">Create an Account</Card.Link>
            </Card.Body>
        </Card></div>);
    }
}

export default Login;

