import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Table from 'react-bootstrap/Table'

class UserAccount extends React.Component {
    getUserInfo = () => {
        const {id} = this.props.match.params;
  
        var userUrl = '/user/'+ id;
        fetch(userUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({id: data.id, 
                firstName: data.firstName, 
                lastName: data.lastName, 
                email: data.email, 
                displayName: data.displayName});
        });
    }

    constructor(props){
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            displayName: ''
        };

        this.getUserInfo();
    }

    render(){
        return(<div style={{padding: "20px", display: "flex",
        justifyContent: "left",
        alignItems: "left", width: "50%"}}><h2>User Account Page</h2><br/>
        <Table striped bordered hover size="sm">
            <tbody>
                <tr><td>First Name</td><td>{this.state.firstName}</td></tr>
                <tr><td>Last Name</td><td>{this.state.lastName}</td></tr>
                <tr><td>Email</td><td>{this.state.email}</td></tr>
                <tr><td>Display Name</td><td>{this.state.displayName}</td></tr>
            </tbody>
        </Table>
        </div>);
    }
}

export default withRouter(UserAccount);