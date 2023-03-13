import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Rules extends React.Component {
    render(){
        return(
            <Container fluid="xs">
            <Row className="justify-content-sm-center">
        <div class="col-lg-8 col-md-8 col-sm-8">
            <h3>General Rules</h3>
            <p>The rules are simple. In the NCAA tournament there are 4 regions with 16 different seeds ranked from
                1-16. Therefore each seed group has 4 different teams to choose from. You will choose a team from each
                seed group giving you 16 teams total. At the end of the tournament, you will get all of the points scored
                by your teams in all games that they played. The person with the most points wins the pool. All picks must
                be submitted before the round of 64 starts on Thursday.
            </p>
            <br/>
            <h3>Play in Games</h3>
            <p>
                There are a few play in games played during the week before the larger tournament schedule starts on Thursday. 
                When making picks you may see multiple teams listed for a team. If you choose a team with a play in game then 
                you will get the team that wins the play in game automatically. You will not get any points scored before Thursday 
                of the first round. In other words, no points for the play in games themselves.
            </p>
            <br/>
            <h3>Disqualified Teams</h3>
            <p>
                This is rare but if you pick a team that gets disqualified for some reason then you will not get points for 
                that team. You will not get to repick. Same goes for those who picked a team that was supposed to play a team that
                got disqualified. Its just tough luck. Now that the COVID pandemic is largely over, this is a very unlikely 
                scenario.
            </p>
        </div></Row></Container>)
    }
}

export default withRouter(Rules);