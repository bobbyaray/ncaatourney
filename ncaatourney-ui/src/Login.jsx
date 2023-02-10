import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          error: '',
          showError: false
        };

        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkTourneyRedirect();
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

      const { history } = this.props;

      fetch('/api/user/login', requestOptions)
      .then(response => {
        if (response.status !== 200) {
          response.json().then(data => {
            this.setState({error: data.message, showError: true});
            return Promise.reject(response);
          });
          throw new Error('Error on user login');
       } else {
          return response.json();
       }
      })
      .then(data => {
        localStorage.setItem("ncaauser", JSON.stringify(data));
        this.props.onUserLogin();
        if(data.admin) {
          history.push('/admin');
        }
        else history.push('/useraccount/' + data.id);
      }).catch((error) => console.log(error));
      
      event.preventDefault();
    }

    checkTourneyRedirect = () => {
      if(window.location.pathname === '/' || window.location.pathname === '/ncaa') {
        // Check for tourney state. If started, redirect to standings.
        var stateUrl = '/api/pool/state';
        fetch(stateUrl)
        .then(response => response.json())
        .then(data => {
            let tourneyHasStarted = (data.state === 'TOURNEY');
            if(tourneyHasStarted) {
              const { history } = this.props;
              history.push('/tourney');
            }
        });
      }
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
                  </Button>&nbsp;
                  <Button href="/ncaa/register" variant="primary">
                    Create an Account
                  </Button>
                </Form>
          </Card.Body>
        </Card></div>);
    }
}

export default withRouter(Login);

