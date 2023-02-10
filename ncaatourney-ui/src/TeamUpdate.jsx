import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class TeamUpdate extends React.Component {
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

    routeToAdmin = () => {
        const { history } = this.props;
        history.push('/admin');
    }

    getTeamInfo = () => {
        const {id} = this.props.match.params;
  
        var teamUrl = '/api/teams/'+ id;
        fetch(teamUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({id: data.id, 
                name: data.name, 
                seed: data.seed, 
                alive: data.alive, 
                score64: data.score64,
                score32: data.score32,
                score16: data.score16,
                score8: data.score8,
                score4: data.score4,
                score2: data.score2});
        });
    }

    saveTeamInfo= () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 't' : this.state.adminToken },
            body: JSON.stringify({ 
              id: this.state.id,
              seed: this.state.seed, 
              name: this.state.name,
              alive: this.state.alive,
              score64: this.state.score64,
              score32: this.state.score32,
              score16: this.state.score16,
              score8: this.state.score8,
              score4: this.state.score4,
              score2: this.state.score2})
        };
  
        fetch('/api/teams', requestOptions).then(this.routeToAdmin());
    }

    componentDidMount() {
        this.checkAdmin();
    }

    constructor(props){
        super(props);
        this.state = {
          id: '',
          name: '',
          seed: 1,
          alive: false,
          score64: 0,
          score32: 0,
          score16: 0,
          score8: 0,
          score4: 0,
          score2: 0,
          adminToken: ''  
        };

        this.handleChange = this.handleChange.bind(this);

        this.getTeamInfo();
      }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if(name == 'alive') this.setState({[name]: !this.state.alive})
        else this.setState({[name]: value});
    }

    render(){
        return(<div>
            <h3 style={{padding: "10px", display: "flex", justifyContent: "left", alignItems: "left"}}>
              Update Team
            </h3>
            <div style={{padding: "10px", justifyContent: "left", alignItems: "left", width: "80%"}}>
            <Form>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th style={{width: '100px'}}>Seed</th>
                <th>Name</th>
                <th>64</th>
                <th>32</th>
                <th>16</th>
                <th>8</th>
                <th>4</th>
                <th>2</th>
                <th>Alive</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                    <Form.Group controlId="seed">
                        <Form.Control 
                            as="select" 
                            name="seed" 
                            className="mr-sm-2" 
                            id="inlineFormCustomSelect" 
                            custom value={this.state.seed} 
                            onChange={this.handleChange}>
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
                </td>
                <td>
                    <Form.Group controlId="name">
                        <Form.Control name="name" htmlSize={50} type="text" value={this.state.name} onChange={this.handleChange}/>
                    </Form.Group>
                </td>
                <td>
                    <Form.Group controlId="score64">
                        <Form.Control name="score64" type="text"  value={this.state.score64} onChange={this.handleChange}/>
                    </Form.Group>
                </td>
                <td>
                    <Form.Group controlId="score32">
                        <Form.Control name="score32" type="text"  value={this.state.score32} onChange={this.handleChange}/>
                    </Form.Group>
                </td>
                <td>
                    <Form.Group controlId="score16">
                        <Form.Control name="score16" type="text"  value={this.state.score16} onChange={this.handleChange}/>
                    </Form.Group>
                </td>
                <td>
                    <Form.Group controlId="score8">
                        <Form.Control name="score8" type="text"  value={this.state.score8} onChange={this.handleChange}/>
                    </Form.Group>
                </td>
                <td>
                    <Form.Group controlId="score4">
                        <Form.Control name="score4" type="text"  value={this.state.score4} onChange={this.handleChange}/>
                    </Form.Group></td>
                <td>
                    <Form.Group controlId="score2">
                        <Form.Control name="score2" type="text"  value={this.state.score2} onChange={this.handleChange}/>
                    </Form.Group>
                </td>
                <td>
                    <Form.Group controlId="alive">
                        <Form.Check 
                            type="switch"
                            id="alive"
                            name="alive"
                            className='form-switch-lg'
                            checked={this.state.alive}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                </td>
              </tr>
            </tbody>
            </Table>
            </Form>
            <Button onClick={this.saveTeamInfo} variant="primary">
                Update Team
            </Button>&nbsp;
            <Button onClick={this.routeToAdmin} variant="secondary">
                Cancel
            </Button>
        </div>
        </div>);
    }
}

export default withRouter(TeamUpdate);