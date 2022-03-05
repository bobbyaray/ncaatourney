import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

export class Register extends React.Component {
    routeUser = () => {
        const { history } = this.props;
        history.push('/useraccount/' + this.state.userid);
    }

    constructor(props){
      super(props);
      this.state = {
        userid: '',  
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        displayName: '',
        admin: 'false',
        score: '0',
        error: '',
        showError: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      localStorage.removeItem("ncaauser");
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
          body: JSON.stringify({ 
            email: this.state.email, 
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            displayName: this.state.displayName,
            admin: this.state.admin,
            score: this.state.score})
      };

      fetch('user', requestOptions)
      .then(response => {
        if (response.status !== 200) {
          response.json().then(data => {
            this.setState({error: data.message, showError: true});
            return Promise.reject(response);
          });
        } else {
          return response.json();
        }
      })
      .then(data => {
          this.state.userid = data.id;
          this.routeUser();
      });
      event.preventDefault();
    }

    render(){
        return(
            <div>
            <h2>NCAA Tournament Pool</h2>
            <div style={{ display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Alert show={this.state.showError} variant="danger" style={{width: "30rem"}}>
                    {this.state.error}
                </Alert>
            </div>
            <Card variant='light' text="white" style={{ width: '30rem', backgroundColor: '#306030' }}>
        <Card.Header>Create an Account</Card.Header>
          <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicFirst">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" value={this.state.firstName} type="firstName"  placeholder="First Name" onChange={this.handleChange} />
                  </Form.Group>
  
                  <Form.Group controlId="formBasicLast">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" value={this.state.lastName} type="lastName" placeholder="Last Name" onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={this.state.email} type="email" placeholder="Enter email" onChange={this.handleChange} />
                  </Form.Group>
  
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formBasicLast">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control name="displayName" value={this.state.displayName} type="displayName" placeholder="Display Name" onChange={this.handleChange} />
                  </Form.Group>
                  <Button onClick={this.handleSubmit} variant="primary">
                    Submit
                  </Button>
                </Form>
          </Card.Body>
          <Card.Body>
            <Card.Link href="#">Back to login</Card.Link>
             </Card.Body>
        </Card></div>);
    }
}

export default withRouter(Register);