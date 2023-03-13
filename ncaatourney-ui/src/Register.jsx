import React from 'react';
import { withRouter } from 'react-router-dom';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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

      fetch('/api/user', requestOptions)
      .then(response => {
        if (response.status !== 200) {
          response.json().then(data => {
            this.setState({error: data.message, showError: true});
          });
          throw new Error('Error saving user');
        } else {
          return response.json();
        }
      })
      .then(data => {
          localStorage.setItem("ncaauser", JSON.stringify(data));
          this.props.onUserLogin();
          this.state.userid = data.id;
          this.routeUser();
      }).catch((error) => console.log(error));
      event.preventDefault();
    }

    render(){
        return(
          <Container fluid="xs">
            <Row className="justify-content-sm-center">
              <div class="col-lg-8 col-md-8 col-sm-8">
                <h2>NCAA Tournament Pool</h2>
                <Alert show={this.state.showError} variant="danger">
                  {this.state.error}
                </Alert>
                <Card variant='light' text="white" className="m-5 border-0 shadow" 
                  style={{backgroundColor: '#306030' }}>
                  <Card.Header>Create an Account</Card.Header>
                  <Card.Body>
                      <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="formBasicFirst">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control name="firstName" 
                          value={this.state.firstName} 
                          type="firstName"  
                          placeholder="First Name" 
                          onChange={this.handleChange} />
                        </Form.Group>
        
                        <Form.Group controlId="formBasicLast">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control name="lastName" 
                          value={this.state.lastName} 
                          type="lastName" 
                          placeholder="Last Name" 
                          onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control name="email" 
                          value={this.state.email} 
                          type="email"
                          placeholder="Enter email" 
                          onChange={this.handleChange} />
                        </Form.Group>
        
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control name="password" 
                          value={this.state.password} 
                          type="password" 
                          placeholder="Password" 
                          onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicLast">
                          <Form.Label>Display Name</Form.Label>
                          <Form.Control name="displayName" 
                          value={this.state.displayName} 
                          type="displayName" 
                          placeholder="Display Name" 
                          onChange={this.handleChange} />
                        </Form.Group>
                        <Button onClick={this.handleSubmit} variant="primary">
                          Submit
                        </Button>
                      </Form>
                    </Card.Body>
                  <Card.Body>
                    <Card.Link href="/ncaa/login">Back to login</Card.Link>
                  </Card.Body>
                </Card>
              </div>
            </Row></Container>);
    }
}

export default withRouter(Register);