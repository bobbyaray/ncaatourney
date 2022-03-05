import React from 'react';
import { withRouter } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup, Form, Button, Table, Alert } from 'react-bootstrap';

class UserAccount extends React.Component {
    getUserInfo = () => {
        const {id} = this.props.match.params;
  
        // Get the users information
        var userUrl = '/user/'+ id;
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
      
          fetch('/user', requestOptions)
          .then(this.setState({successMessage: 'User updated successfully', showSuccess: true}));
    }

    updateSeedPicks = () => {
        var teamsUrl = '/teams/groupbyseed';
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
            errorMEssage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.getUserInfo();
        this.updateSeedPicks();
    }

    render(){
        return(<div style={{padding: "0px"}}>
            <h2 style={{paddingLeft: "20px", paddingBottom: "10px", display: "flex", justifyContent: "left", alignItems: "left"}}>
                User Account Page
            </h2>
            <div style={{padding: "20px", display: "flex",
                justifyContent: "left",
                alignItems: "left", width: "30%"}}>
                <Alert show={this.state.showSuccess} variant="success" >
                    {this.state.successMessage}
                </Alert>
            </div>
            <div style={{paddingLeft: "20px", display: "flex", justifyContent: "left", alignItems: "left", width: "50%"}}>
        <Table striped bordered size="sm">
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
        </div>
        <div style={{paddingLeft: "20px", display: "flex",
        justifyContent: "left",
        alignItems: "left", width: "50%"}}>
        <Table hover size="sm">
            <thead>
                <th>Seed</th>
                <th>Picks</th>
            </thead>
            <tbody>
                {this.state.seedPicks.map((seedPick, seedidx) => (
                <tr><td>{seedPick.seed}</td>
                    <td>
                        <ToggleButtonGroup 
                        type="radio" 
                        value={this.state[`seed_${seedidx+1}`]} 
                        name={`seed_${seedidx+1}`} 
                        style={{width: "100%"}}>
                            {seedPick.teams.map((team) => (
                            <ToggleButton
                                type="radio"
                                variant={'outline-primary'}
                                value={team.id}
                                style={{width: "25%"}}
                                onChange={this.handleChange}
                            >
                                {team.name}
                            </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
        </div>
        <div style={{paddingLeft: "20px", display: "flex",
        justifyContent: "left",
        alignItems: "left"}}>
        <Form.Group controlId="formBasicFirst">
                    <Button type="button" 
                    className="btn btn-primary btn" 
                    onClick={this.saveUser} 
                    style={{display: "flex", 
                    justifyContent: "right", 
                    alignItems: "right"}}>
                      Update User
                    </Button>
                  </Form.Group>
        </div>
        </div>);
    }
}

export default withRouter(UserAccount);