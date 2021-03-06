import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import StudentNavigation from './StudentNavigaton';
import QuizPopup from './QuizPopup';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import sample from '../logoLoading.webm';
import '../App.css';
import '../css/quiz.css';

export default class Quiz extends React.Component {

    constructor() {
        super();
        this.state = {
            showModalPopup: false,
            data: [],
            uid: '',
            id: 0,
            quizID: 0,
            totalMarks:0,
            totalPoints:0,
            display: 'block',
            display2: 'none'
        }
    }

    componentDidMount() {
    
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ display: 'none' });
                this.setState({ display2: 'block' });
                console.log("User is Signed IN ");
                this.setState({ uid: user.uid });
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
                axios.get(`https://ades-ca1-project.herokuapp.com/api/userType/` + this.state.uid, config)
                    .then(res => {//call maze animation
                       
                        if (res.data.type === 1) {
                           this.setState({ id: res.data.studentID })
                           // area to put your axios with the student id

                        } else if (res.data.type === 2) {
                            window.location.replace('https://ades-ca1-project.herokuapp.com/quizment/teacherDashboard');
                        } else {
                            window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
                        }
                    })
            } else {
                console.log("THERE IS NO USER");
                signOut(auth);
                window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
            }
        });
        axios.get(`https://ades-ca1-project.herokuapp.com/api/quiz`)
            .then(res => {
                console.log(res.data.length);
                this.setState({ data: res.data });

                console.log(res.data.length);

                this.setState({ data: res.data });


            });
    }

    handleClose = () => {
        let status = false
        this.setState({ showModalPopup: status });
        window.location.reload();
    }

   
    handleScoreAndPoints = (quizID, totalMarks, totalPoints)  => {
      
        this.setState({ quizID: quizID });
      this.setState({totalMarks:totalMarks});
      this.setState({totalPoints:totalPoints});
        console.log("BUTTON CLICKED");
        // const quizID = this.state.quizID
        // const totalMarks = this.state.totalMarks
        // const totalPoints = this.state.totalPoints

        const quiz = {
            quizID: this.state.quizID,
            studentID: this.state.id,
            pointsEarned: this.state.totalPoints,
            marksEarned: this.state.totalMarks
        };
        const studentUpdatePoint = {
            studentID: this.state.id,
            pointsEarned: this.state.totalPoints
        }

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        axios.post('https://ades-ca1-project.herokuapp.com/api/quizHistory', quiz, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("AXIOS POSTING")
                // this.quizHistory(function(){
                //     console.log("its in quizHistory callback")
                //     this.setShowModalPopupTrue()
                // });
          
            })
        axios.put(`https://ades-ca1-project.herokuapp.com/api/studentPoints`, studentUpdatePoint, config)
            .then(res => {
                console.log("HELLO WORK PLS");
                console.log(res);
                console.log(res.data);
                console.log("AXIOS PUTTING")
                window.alert("points awarded");//NEED NOTY HERE STATING THAT POINTS ARE ADDED
                axios.get('https://ades-ca1-project.herokuapp.com/api/summary/'  + this.state.quizID + '/' + this.state.id)
              .then(res => {
                  this.setState({ data: res.data });
                 this.setState({ showModalPopup: true });
                 
              })
            })

        }
       

    render() {
        const data = this.state.data;
        // When the user clicks anywhere outside of the modal, close it
        return (
            <div>
            <video style={{ display: this.state.display, width: '100%', height: 'auto' }} className='videoLoader' autoPlay loop muted>
                    <source src={sample} type='video/webm' />
                </video>
            <div style={{ display: this.state.display2 }}>
                <StudentNavigation  className="navBar">
                </StudentNavigation>
                <div id="users" class="row">
                </div>
              
                <table class="quizTable">

                    {data && data.map(item =>
                        <tr key={item.quizID} id='tableRow' class="quizRow">
                            <td className="quizTitle quizTableD">Quiz {item.quizID}</td>
                            <td className="marks quizTableD">Total Marks: {item.totalMarks}</td>
                            <td className="quizpoints quizTableD">Total Points:{item.totalPoints}</td>

                            <td className="quizTableD">
                                <button className="gradient-button gradient-button-1" onClick={() => this.handleScoreAndPoints(item.quizID, item.totalMarks, item.totalPoints)}  type="submit" id="myBtn">Do Quiz!</button>

                            </td>
                        </tr>
                    )}
                </table>
                <QuizPopup
                    showModalPopup={this.state.showModalPopup}
                    onPopupClose={this.handleClose}
                    data={this.state.data}
                ></QuizPopup>
            </div>
            </div>
        )
    }
}