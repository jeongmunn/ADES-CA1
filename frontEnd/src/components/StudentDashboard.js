import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Glyphicon, Sidebar, Nav, NavItem, Card, ListGroup } from 'react-bootstrap';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';

import { Progress } from 'antd';
import { Stepper, Step } from 'react-form-stepper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';


import '../styling.css'



const styles = theme => ({
    root: {
        // paddingTop: '100px',
        marginTop: "60px",



        width: "250px",

        marginLeft: "40px",


    },
});

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    }
];

const logout = async () => {
    await signOut(auth);
};

// const { Step } = Steps

class StudentDashboard extends React.Component {
    state = {
        data: [],
        streaks: 0,
        fullStreaks: 0,
        totalPts: [],
        redeemedPts: [],
        name: [],
        showStreak: false,
        lastLogin: [],
        currentLogin: parseInt(new Date().getTime())



    }

    componentDidMount() {
    

        axios.get('http://localhost:8081/students/topStudents/')
            .then(res => {
                this.setState({ data: res.data });
            })

        axios.get('http://localhost:8081/students/streaks/' + 4)
            .then(res => {
                console.log("number of streak " + res.data[0].streaks)
                const streaks = res.data[0].streaks;




                this.setState({ streaks });

                // let progress = 0;
                // if (this.state.streaks === 1) {
                //     progress += 20
                //     this.setState({ progress: progress })
                // }
                // if (this.state.streaks === 2) {
                //     progress += 40
                //     this.setState({ progress: progress })
                // }
                // if (this.state.streaks === 3) {
                //     progress += 60
                //     this.setState({ progress: progress })
                // }
                // if (this.state.streaks === 4) {
                //     progress += 80
                //     this.setState({ progress: progress })
                // }
                // if (this.state.streaks === 5) {
                //     progress += 100
                //     this.setState({ progress: progress })
                // }


            })

        axios.get('http://localhost:8081/students/points/' + 4)
            .then(res => {
                console.log("number of streak " + res.data[0].totalPts)
                console.log("number of streak " + res.data[0].redeemedPts)
                const totalPts = res.data[0].totalPts;
                const redeemedPts = res.data[0].redeemedPts;
                const name = res.data[0].name;

                this.setState({ totalPts });

                this.setState({ redeemedPts });

                this.setState({ name });

            })

                
        axios.get('http://localhost:8081/students/lastLogin/' + 4)
        .then(res => {
            console.log("LAST LOGIN " + res.data[0].lastLogin)

            
            this.setState({ lastLogin:res.data[0].lastLogin})

            const i = parseInt(new Date().getTime());

            console.log("before : " + i)
            console.log("after : " + parseInt(i))
            const currentLogin = parseInt(i)

            this.setState({ currentLogin })

        
            console.log("Current login: " + currentLogin)
            console.log("Current login stored: " + this.state.currentLogin)
            console.log("Last login stored: " + this.state.lastLogin)



        })

        const lastLoginData =this.state.lastLogin;

        console.log("------ last login "+lastLoginData+"-------")

            const lastLog = {
                lastLogin : this.state.currentLogin
            }
       


          
            console.log("------"+JSON.stringify(lastLog.lastLogin)+"-------")
            console.log("------"+JSON.stringify(this.state.currentLogin)+"-------")
            console.log("------"+JSON.stringify(this.state.lastLogin)+"-------")


          
         
           
      
        
            const config = {
              headers: {
                'content-type': 'application/json'
              }
            }
          

        axios.put('http://localhost:8081/students/lastLogin/' + 4,  lastLog, config)
            .then(res => {
              
                console.log("Current login stored in put function: " + this.state.currentLogin)


                console.log("RESULTS: "+res);
                console.log(res);
                console.log("RESULT: "+res.data);
            })






    }




    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }



    render() {
        const data = this.state.data;
        const { classes } = this.props;
        return (

            <Container className="toatalContainer" fluid>

                <Row xs={1} className="row">
                    <Col md={4} className="c1 column">


                        <h4 className="mt-5 mb-5">{this.state.name}</h4>

                        <Card className="mb-3 points">
                            <Card.Body>
                                <Card.Title className="cardContext">Total Points:</Card.Title>

                                <Card.Text className="cardContext">
                                    {this.state.totalPts}

                                </Card.Text>

                            </Card.Body>

                        </Card>

                        <Card className="mb-3 points">
                            <Card.Body>
                                <Card.Title className="cardContext">Redeemable Points</Card.Title>

                                <Card.Text className="cardContext">
                                    {this.state.redeemedPts}

                                </Card.Text>

                            </Card.Body>

                        </Card>


                        <div className="box">




                            <hr />


                            <Nav className="col-md-12 d-none d-md-block sidebar navCustomise sideNavItem"
                                activeKey="/home"
                                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                            >

                                <div className="sidebar-sticky"></div>
                                <Nav.Item className="navItem " activeClassName="active" >
                                    <Nav.Link className="linkCustomise" href="/home">Dashboard</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-1">Reward</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Maze</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Badges</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Streak</Nav.Link>
                                </Nav.Item>
                            </Nav>


                        </div>
                    </Col>
                    <Col md={4} className="box2 column">

                        <h4>Assignments To Do:</h4>

                        <Card className="mt-3">
                            <Card.Header>Math</Card.Header>
                            <Card.Body>
                                <Card.Title>Integration Homework 2</Card.Title>
                                <Card.Text>
                                    Learn how to do Integration
                                </Card.Text>
                                <Button variant="danger">Do Now</Button>
                            </Card.Body>
                        </Card>

                        <Card className="mt-3">
                            <Card.Header>Math</Card.Header>
                            <Card.Body>
                                <Card.Title>Integration Homework 3</Card.Title>
                                <Card.Text>
                                    Learn how to do Integration part 3
                                </Card.Text>
                                <Button variant="danger">Do Now</Button>
                            </Card.Body>
                        </Card>


                        <Card className="mt-3">
                            <Card.Header>Math</Card.Header>
                            <Card.Body>
                                <Card.Title>Integration Homework 2</Card.Title>
                                <Card.Text>
                                    Learn how to do Integration
                                </Card.Text>
                                <Button variant="danger">Do Now</Button>
                            </Card.Body>
                        </Card>


                    </Col>
                    <Col md={3} className=" box3 column">
                        <Col>

                            <Row className="sliderStreak">
                                <Col>
                                    <Slider
                                        className={classes.root}
                                        aria-label="Always visible"
                                        value={this.state.streaks}
                                        step={1}
                                        min={0}
                                        max={5}
                                        marks={marks}


                                        valueLabelDisplay="off"
                                    />
                                </Col>
                                <Col className="streakNum">

                                    <h6>Streaks: {this.state.streaks} </h6>
                                </Col>
                            </Row>

                            <button onClick={logout}>Sign Out</button>








                        </Col>

                        <Card className="leaderBoardBox"  >
                            <Card.Header className="leaderBoardTitle">
                                Leaderboard
                            </Card.Header>
                            <Card.Body>
                                {data && data.map(item =>
                                    <Card className="m-2 " style={{ width: '16rem' }} key={item.studentID}>

                                        <ListGroup variant="flush" >

                                            <ListGroup.Item  >
                                                <Row className="leaderBoardItem">
                                                    <Col>
                                                        {item.name}
                                                    </Col>
                                                    <Col>
                                                        {item.totalPts}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                        </ListGroup>

                                    </Card>
                                )}

                            </Card.Body>
                        </Card>


                    </Col>
                </Row>


                {/* <input type="range" className="custom-range" id="customRange1" /> */}
            </Container>







            //                     <Progress
            //                         type="line"
            //                         height='30px'
            //                         strokeColor={{
            //                             '0%': '#f0bb31',
            //                             '50%': '#e39c4f',
            //                             '100%': '#db8427',
            //                         }}

            //                         percent={this.state.progress}
            //                         status="active"
            //                     >

            //                     </Progress>












        )
    }
}


StudentDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentDashboard);


