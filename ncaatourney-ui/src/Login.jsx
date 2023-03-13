import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


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
          <Container fluid="xs">
            <Row className="justify-content-sm-center">
            <div class="col-lg-6 col-md-6 col-sm-6">
            <h2>NCAA Tournament Pool</h2>
            <div style={{ display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Alert show={this.state.showError} variant="danger">
                    {this.state.error}
                </Alert>
            </div>
            <Card variant='light' text="white" className="m-5 border-0 shadow" style={{backgroundColor: '#306030' }}>
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
            </Card>
            </div>
          </Row></Container>);
    }
}

export default withRouter(Login);

