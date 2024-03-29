import React from 'react';
import { withRouter } from "react-router-dom";
import { Form, Button, Table, Alert } from 'react-bootstrap';

class Admin extends React.Component {
  checkAdmin = () => {
    let user = localStorage.getItem("ncaauser");
    if(user != null) {
      let userJson = JSON.parse(user);
      let isUserAdmin = userJson.admin;
      
      if(!isUserAdmin) {
        const { history } = this.props;
        history.push('/'); 
      } else {
        this.setState({adminToken: userJson.adminToken});
      }
    } else {
      const { history } = this.props;
      history.push('/'); 
    }
  }

  componentDidMount() {
    this.checkAdmin();
    this.fetchPoolState();
    this.updateTeams();
    this.updateUsers();
  }

  addTeam = (event) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 't' : this.state.adminToken},
      body: JSON.stringify({ 
        name: this.state.add_team_name, 
        seed: this.state.add_team_seed,
        alive: true})
    };

    fetch('/api/teams', requestOptions)
    .then(response => {
      if (response.status !== 200) {
        response.json().then(data => {
          this.setState({teamAlert: data.message, showTeamAlert: true, teamAlertVariant: "danger"});
          return Promise.reject(response);
        });
        throw new Error('Error adding team');
      } else {
        this.updateTeams()
        var successMsg = "Team: " + this.state.add_team_name + " seed: " + this.state.add_team_seed + " added successfully";
        this.setState({teamAlert: successMsg, showTeamAlert: true, teamAlertVariant: "success"});
      }
    });

    event.preventDefault();

  };   

  updateTourney = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json' , 't' : this.state.adminToken},
      body: JSON.stringify({ 
        tourneyYear: this.state.tourney_year, 
        state: this.state.tourney_state})
    };

    fetch('/api/pool/state', requestOptions)
    .then(response => {
      if (response.status !== 200) {
        response.json().then(data => {
          this.setState({tourneyAlert: data.message, showTourneyAlert: true, tourneyAlertVariant: "danger"});
          return Promise.reject(response);
        });
        throw new Error('Error updating tourney');
      } else {
        this.fetchPoolState()
        var successMsg = "Tourney state updated successfully."
        this.setState({tourneyAlert: successMsg, showTourneyAlert: true, tourneyAlertVariant: "success"});
      }
    });
  };
  
  updateTeams = () => {
    var teamsUrl = '/api/teams/list';
    fetch(teamsUrl)
    .then(response => response.json())
    .then(data => {
        this.setState({teams: data})
    });
  }

  updateUsers = () => {
    var userUrl = '/api/user/list';
    fetch(userUrl)
    .then(response => response.json())
    .then(data => {
        this.setState({users: data})
    });
  }

  fetchPoolState = () => {
    var stateUrl = '/api/pool/state';
    fetch(stateUrl)
    .then(response => response.json())
    .then(data => {
        this.setState({tourney_year: data.tourneyYear, tourney_state: data.state});
    });
  }

  deleteTeam  = (teamId) => {
    // Ask for confirmation first
    if(window.confirm("Are you sure you want to delete team: " + teamId + "?") != true) return;

    // Delete the team
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 't' : this.state.adminToken }
    };

    var deleteTeamUrl = '/api/teams/' + teamId;
    fetch(deleteTeamUrl, requestOptions)
    .then(response => this.updateTeams());
  }

  deleteUser  = async(userId) => {
    // Get the user email to display to user
    var getUserUrl = '/api/user/' + userId;
    const userRes = await fetch(getUserUrl);
    const userJson = await userRes.json();
    const userEmail = userJson.email;



    // Ask for confirmation first
    if(window.confirm("Are you sure you want to delete user: " + userEmail + "?") != true) return;

    // Delete the team
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 't' : this.state.adminToken  }
    };

    var deleteUserUrl = '/api/user/' + userId;
    fetch(deleteUserUrl, requestOptions)
    .then(response => {
      this.updateUsers()
      var successMsg = "User " + userId + " has been deleted."
      this.setState({userAlert: successMsg, userAlertVariant: "success", showUserAlert: true});
    });
  }

  resetPool = () => {
    // Ask for confirmation first
    if(window.confirm("Are you sure you want to reset the pool?") != true) return;

    // Delete the team
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 't' : this.state.adminToken  }
    };

    var resetUrl = '/api/pool/reset';
    fetch(resetUrl, requestOptions)
    .then(response => {
      this.fetchPoolState();
      this.updateTeams();
      this.updateUsers();
    });
  }

  updateTeam  = (teamId) => {
    const { history } = this.props;
    history.push('/teamupdate/' + teamId);  
  }

  loginAsUser = (userID) => {
    const { history } = this.props;

    const requestOptions = {
      headers: {'t' : this.state.adminToken }
    };

    fetch('/api/pool/loginuser/' + userID, requestOptions)
    .then(response => {
      if (response.status !== 200) {
        response.json().then(data => {
          return Promise.reject(response);
        });
    } else {
        return response.json();
    }
    })
    .then(data => {
      localStorage.setItem("ncaauser", JSON.stringify(data));
      this.props.onUserLogin();
      history.push('/useraccount/' + data.id);
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
          tourney_year: '',
          tourney_state: '',
          add_team_name: '',
          add_team_seed: 1,
          teams: [],
          users: [],
          alertVariant: '',
          adminToken: '',
          tourneyAlert: '',
          tourneyAlertVariant:'success',
          showTourneyAlert: false,
          teamAlert: '',
          showTeamAlert: false,
          teamAlertVariant:'success',
          userAlert: '',
          showUserAlert: false,
          userAlertVariant:'success'
      };

      this.handleChange = this.handleChange.bind(this);
    }

    render(){
        return(<div>
            <h2>Admin Page</h2>
            <hr/>
            <h4 style={{paddingLeft: "20px", display: "flex", justifyContent: "left", alignItems: "left"}}>
              Tourney
            </h4>
            <div style={{padding: "20px", display: "flex", justifyContent: "left", alignItems: "left"}}>
            <Form>
            <Alert show={this.state.showTourneyAlert} variant={this.state.tourneyAlertVariant}>
                {this.state.tourneyAlert}
              </Alert>
                Year <Form.Group controlId="year">
                    <Form.Control type="text" 
                    placeholder="year" 
                    name="tourney_year" 
                    value={this.state.tourney_year} 
                    onChange={this.handleChange}/>
                </Form.Group>
                State<Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" name="tourney_state" 
                    value={this.state.tourney_state} className="mr-sm-2" 
                    id="inlineFormCustomSelect" custom onChange={this.handleChange}>
                    <option>ADMIN_PICKS</option>
                    <option>USER_PICKS</option>
                    <option>TOURNEY</option>
                    </Form.Control>
                </Form.Group>
                <Button className="btn btn-primary btn" onClick={this.updateTourney}>
                    Update Tourney
                </Button>&nbsp;&nbsp;
                <Button className="btn btn-danger btn" onClick={this.resetPool}>
                    Reset Pool
                </Button>
            </Form>
            </div>
            <hr/>
            <h4 style={{paddingLeft: "20px", display: "flex", justifyContent: "left", alignItems: "left"}}>
              Teams
            </h4>
            <div style={{padding: "20px", display: "flex",justifyContent: "left", alignItems: "left"}}>              
              <Form>
              <Alert show={this.state.showTeamAlert} variant={this.state.teamAlertVariant}>
                  {this.state.teamAlert}
                </Alert>
                    Team<Form.Group controlId="name">
                      <Form.Control name="add_team_name" type="name"  placeholder="Team Name" value={this.state.add_team_name} onChange={this.handleChange}/>
                    </Form.Group>
                  Seed<Form.Group controlId="seed">
                  <Form.Control as="select" name="add_team_seed" className="mr-sm-2" id="inlineFormCustomSelect" custom value={this.state.add_team_seed} onChange={this.handleChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                  </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicFirst">
                    <Button type="button" className="btn btn-primary btn" onClick={this.addTeam}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                      &nbsp; Add Team
                    </Button>
                  </Form.Group>
              </Form>
                  </div>
            <div class="col-lg-12 col-md-12 col-sm-12" style={{paddingLeft: "20px", justifyContent: "left", alignItems: "left"}}>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Seed</th>
                <th>Name</th>
                <th>64</th>
                <th>32</th>
                <th>16</th>
                <th>8</th>
                <th>4</th>
                <th>2</th>
                <th>Alive</th>
                <th>Options</th>
                </tr>
            </thead>
            <tbody>
            {this.state.teams.map((team) => (
                <tr>
                <td>{team.seed}</td>
                <td>{team.name}</td>
                <td>{team.score64}</td>
                <td>{team.score32}</td>
                <td>{team.score16}</td>
                <td>{team.score8}</td>
                <td>{team.score4}</td>
                <td>{team.score2}</td>
                <td>{String(team.alive)}</td>
                <td>
                  <Button type="button" className="btn btn-primary btn-sm" onClick={() => {this.updateTeam(team.id)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                    &nbsp; Update
                  </Button>&nbsp;
                  <Button type="button" className="btn btn-danger btn-sm" onClick={() => {this.deleteTeam(team.id)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    &nbsp; Delete
                  </Button>
              </td>
              </tr>
            ))}
            </tbody>
            </Table>
            </div>
            <hr/>
            <h4 style={{padding: "20px", display: "flex", justifyContent: "left",alignItems: "left"}}>
              Users
            </h4>
            <div class="col-lg-12 col-md-12 col-sm-12" style={{padding: "20px", justifyContent: "left", alignItems: "left"}}>
            <Alert show={this.state.showUserAlert} variant={this.state.userAlertVariant}>
                {this.state.userAlert}
              </Alert>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Options</th>
                </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                <Button type="button" className="btn btn-primary btn-sm" onClick={() => {this.loginAsUser(user.id)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                    &nbsp; Login as User
                  </Button>&nbsp;
                  <Button type="button" className="btn btn-danger btn-sm" onClick={() => {this.deleteUser(user.id)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    &nbsp; Delete
                  </Button> </td>
                </tr>
              ))}
            </tbody>
            </Table>
            </div>
            </div>);
    }
}

export default withRouter(Admin);