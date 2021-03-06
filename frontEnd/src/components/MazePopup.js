import React, { Component, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import jQuery from 'jquery';

export default class MazePopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            newLevel:false,
            currentPts : 0,
            totalPts : 0,
            mazeLvl: 0,
            
        };
    }
    

    isShowModal = (status) => {
        this.handleClose();
        this.setState({ showModal : status});
    }

    handleClose = () => {
        this.props.onPopupClose(false,this.props.level);
    }
    buttonPressed = () => {
        axios.get('https://ades-ca1-project.herokuapp.com/api/points/' + this.props.id)
            .then(res => {
                this.setState({ totalPts: res.data[0].totalPts });
                this.setState({ mazeLvl: res.data[0].mazeLvl });

                this.setState({
                    currentPts: res.data[0].redeemedPts
                }, () => {
                    this.handleComplete();
                });
            })

    }

    handleComplete = () => {
        
        // Store student's points
        const quizPts = this.props.point;
        const currentPoints = (this.state.currentPts + quizPts);
        const totalPoints = (this.state.totalPts + quizPts);
       
        const mazeLvl = (parseInt(this.state.mazeLvl) + 1);
    
        // Do the calculation
        this.setState({ currentPts : currentPoints});
        this.setState({ totalPts : totalPoints});
        this.setState({ mazeLvl : mazeLvl});
        // Update student's table
        const data = {
            currentPts : currentPoints,
            totalPts : totalPoints,
            mazeLvl: mazeLvl
        }

        const config = {
            headers: {
                'content-type':'application/json'
            }
        }

        axios.put('https://ades-ca1-project.herokuapp.com/api/points/' + this.props.id, data, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })

        const points = {
            ptsAwarded : quizPts,
            eventID : 2
        }

        // Insert points history
        axios.post('https://ades-ca1-project.herokuapp.com/api/ptsHistory/' + this.props.id, points, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.handleClose();
            window.alert("Points redeemed successfully");
            //updating the state 
            this.props.onNewLevel(true);
            
        })
    }

    render() {
             
        return (
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose} id={this.props.level} 
                    size="lg" aria-labelledby="contained-modal-title-vcenter" centered>  
                    <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                            Level {this.props.level}
                         </Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <hr />  
                        <div className="Quiz"> 
                        <div>Points : {this.props.point} </div>
                        <Button onClick={this.buttonPressed} >Complete</Button>
                        </div>  
                    </Modal.Body>  
                </Modal >  
            </Fragment >  
        )
    }
}