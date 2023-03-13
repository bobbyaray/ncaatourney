import React from 'react';
import { withRouter } from "react-router-dom";
import { Table } from 'react-bootstrap';

class Tourney extends React.Component {
    getTourneyStarted = () => {
        var stateUrl = '/api/pool/state';
        fetch(stateUrl)
        .then(response => response.json())
        .then(data => {
            let tourneyHasStarted = (data.state === 'TOURNEY');
            this.setState({tourneyStarted: tourneyHasStarted});
            if(tourneyHasStarted) this.fetchStandings();
        });
    }

    fetchStandings = () => {
        var standingsUrl = '/api/standings';
        fetch(standingsUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({entries: data});
        });
    }

    constructor(props){
        super(props);
        this.state = {
            entries: [],
            tourneyStarted: false
        };

        this.getTourneyStarted();
    
    }
    render(){
        if(!this.state.tourneyStarted) {
            return (<h3>Tourney has not yet begun. Check back later.</h3>);
        }
        else return(<div class="container">
            <h2>Current Standings</h2>
            <div class="col-lg-12 col-md-12 col-sm-12">
            <Table bordered size="sm" style={{backgroundColor: 'white' }}>
            <thead style={{backgroundColor: '#306030', color: 'white'}}>
                <tr>
                <th>Place</th>
                <th>Name</th>
                <th>Score</th>
                <th>Teams Alive</th>
                </tr>
            </thead>
            <tbody>
            {this.state.entries.map((entry, idx) => (
                <tr>
                <td>{idx+1}</td>
                <td>{entry.userName}</td>
                <td>{entry.score}</td>
                <td>{entry.teamsRemaining}</td>
              </tr>
            ))}
            </tbody>
            </Table>
            </div>

            <h2>All Picks</h2>
            {this.state.entries.map((entry) => (
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <Table bordered size="sm" style={{backgroundColor: 'white'}}>
                    <thead style={{backgroundColor: '#306030', color: 'white'}}>
                        <tr>
                        <th colSpan={8}>{entry.userName} ({entry.score})</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{fontWeight: 'bold'}}>
                            <td>Seed</td>
                            <td>Name</td>
                            <td>64</td>
                            <td>32</td>
                            <td>16</td>
                            <td>8</td>
                            <td>4</td>
                            <td>2</td>
                        </tr>
                    {entry.picks.map((pick, idx) => (
                        <tr style={pick.alive ? {backgroundColor: 'white'} : {backgroundColor: 'lightgray'}}>
                        <td>{idx+1}</td>
                        <td>{pick.name}</td>
                        <td>{pick.score64}</td>
                        <td>{pick.score32}</td>
                        <td>{pick.score16}</td>
                        <td>{pick.score8}</td>
                        <td>{pick.score4}</td>
                        <td>{pick.score2}</td>
                    </tr>
                    ))}
                    </tbody>
                    </Table>
                </div>
            ))}
            
            </div>);
    }
}

export default withRouter(Tourney);