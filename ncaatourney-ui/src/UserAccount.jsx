import React from 'react';
import { withRouter } from "react-router-dom";
import { Form, Button, Table, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class UserAccount extends React.Component {
    getTourneyStarted = () => {
        var stateUrl = '/api/pool/state';
        fetch(stateUrl)
        .then(response => response.json())
        .then(data => {
            let tourneyHasStarted = (data.state === 'TOURNEY');
            this.setState({tourneyStarted: tourneyHasStarted});
        });
    }

    getUserInfo = () => {
        const {id} = this.props.match.params;
  
        // Get the users information
        var userUrl = '/api/user/'+ id;
        fetch(userUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({id: data.id, 
                firstName: data.firstName, 
                lastName: data.lastName, 
                email: data.email, 
                displayName: data.displayName,
                seed_1: data.seed_01,
                seed_2: data.seed_02,
                seed_3: data.seed_03,
                seed_4: data.seed_04,
                seed_5: data.seed_05,
                seed_6: data.seed_06,
                seed_7: data.seed_07,
                seed_8: data.seed_08,
                seed_9: data.seed_09,
                seed_10: data.seed_10,
                seed_11: data.seed_11,
                seed_12: data.seed_12,
                seed_13: data.seed_13,
                seed_14: data.seed_14,
                seed_15: data.seed_15,
                seed_16: data.seed_16});
        });
    }

    saveUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              id: this.state.id, 
              displayName: this.state.displayName,
              seed_01: this.state.seed_1,
              seed_02: this.state.seed_2,
              seed_03: this.state.seed_3,
              seed_04: this.state.seed_4,
              seed_05: this.state.seed_5,
              seed_06: this.state.seed_6,
              seed_07: this.state.seed_7,
              seed_08: this.state.seed_8,
              seed_09: this.state.seed_9,
              seed_10: this.state.seed_10,
              seed_11: this.state.seed_11,
              seed_12: this.state.seed_12,
              seed_13: this.state.seed_13,
              seed_14: this.state.seed_14,
              seed_15: this.state.seed_15,
              seed_16: this.state.seed_16
            })
          };
      
          fetch('/api/user', requestOptions)
          .then(() => {
            this.setState({successMessage: 'User Account updated successfully', showSuccess: true})
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
    }

    updateSeedPicks = () => {
        var teamsUrl = '/api/teams/groupbyseed';
        fetch(teamsUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({seedPicks: data})
        });
      }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    constructor(props){
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            displayName: '',
            seedPicks: [],
            picksId: '',
            seed_1: '',
            seed_2: '',
            seed_3: '',
            seed_4: '',
            seed_5: '',
            seed_6: '',
            seed_7: '',
            seed_8: '',
            seed_9: '',
            seed_10: '',
            seed_11: '',
            seed_12: '',
            seed_13: '',
            seed_14: '',
            seed_15: '',
            seed_16: '',
            showSuccess: false,
            showError: false,
            successMessage: '',
            errorMessage: '',
            tourneyStarted: 'false'
        };

        this.handleChange = this.handleChange.bind(this);
        this.getUserInfo();
        this.updateSeedPicks();
        this.getTourneyStarted();
    }

    render(){
        const renderUserInfo = () => {
                return(
                <div class="col-lg-8 col-md-8 col-sm-8">
                    <Table bordered size="sm">
                        <tbody>
                            <tr><td>First Name</td><td>{this.state.firstName}</td></tr>
                            <tr><td>Last Name</td><td>{this.state.lastName}</td></tr>
                            <tr><td>Email</td><td>{this.state.email}</td></tr>
                            <tr><td>Display Name</td>
                                <td>
                                <Form.Group controlId="displayName">
                                    <Form.Control type="text" 
                                    placeholder="displayName" 
                                    name="displayName" 
                                    value={this.state.displayName} 
                                    onChange={this.handleChange}/>
                                </Form.Group>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>)
        }

        const renderPicks = () => {
            if(this.state.tourneyStarted) {
                return(<p>The tournament has started and the picks are now locked. Please
                    check the home page to see your picks and scores. You can still
                    update your display name.
                </p>)
            } else {
                return (
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <br/>
                        <h3>Picks</h3>
                        {this.state.seedPicks.map((seedPick, seedidx) => (
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label style={{fontSize:12}}>{seedidx+1} seed</Form.Label>
                                <Form.Control as="select" name={`seed_${seedidx+1}`}
                                value={this.state[`seed_${seedidx+1}`]}
                                id="inlineFormCustomSelect" custom onChange={this.handleChange}>
                                    <option selected disabled>{seedidx+1} seed</option>
                                    {seedPick.teams.map((team) => (
                                        <option value={team.id}>{team.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        ))}
                    </div>
                )
            }
        }

        return(
            <Container fluid="sm">
                <Row className="justify-content-sm-center">
                    <h3>User Account</h3>
                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <Alert show={this.state.showSuccess} variant="success" >
                            {this.state.successMessage}
                        </Alert>
                    </div>
                </Row>
                <Row className="justify-content-sm-center">
                    {renderUserInfo()}
                </Row>
                <Row className="justify-content-sm-center">
                {renderPicks()}
                </Row>
                <Row className="justify-content-sm-center">    
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <Form.Group controlId="formBasicFirst">
                                    <Button type="button" 
                                    className="btn btn-primary btn" 
                                    onClick={this.saveUser} 
                                    style={{display: "flex", 
                                    justifyContent: "right", 
                                    alignItems: "right"}}>
                                    Update User Account
                                    </Button>
                                </Form.Group>
                                </div>
                </Row>
            </Container>
        );
    }
}

export default withRouter(UserAccount);