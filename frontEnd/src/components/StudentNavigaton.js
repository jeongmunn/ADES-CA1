import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import '../css/navigation.css';
import sample from '../logoLoading.webm';

const logout = async () => {
    await signOut(auth);
    window.location.replace("https://ades-ca1-project.herokuapp.com/quizment");
};

export default class StudentNavigation extends React.Component {


    render() {

        return (
            <Navbar collapseOnSelect expand='sm' bg="light" variant="light" className="shadow p-3 mb-5 bg-white rounded">
                <Container>
                    <Navbar.Toggle aria-controls='resoponsive-navbar-nav' />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Navbar.Brand href="#home">
                        <p>quizment</p>
                        </Navbar.Brand>

                        <Nav >
                            <Nav.Link>
                                <Link to={`/studentDashboard`} className="navlink nav-link-ltr">
                                    Dashboard
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/quiz`} className="navlink nav-link-ltr">
                                    Quizzes
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/studentBadges`} className="navlink nav-link-ltr">
                                    Badges
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/studentReward`} className="navlink nav-link-ltr">
                                    Reward
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/studentPoints`} className="navlink nav-link-ltr">
                                    Points History
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/mapOfMaze`} className="navlink nav-link-ltr">
                                    Maze
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/profile`} className="navlink nav-link-ltr">
                                    Profile
                                </Link>
                            </Nav.Link>
                            <Nav.Link onClick={logout}>
                                <Link to={`/`} className="navlink nav-link-ltr">
                                    Logout
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        )
    }
}