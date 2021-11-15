import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import TeacherAdministration from './components/TeacherHome';
import BadgeAdmin from './components/BadgeAdmin';
import RewardAdmin from './components/RewardAdmin';
// import UploadReward from './components/UploadReward';
import RewardAdminEdit from './components/RewardAdminEdit';
// import TeacherViewStudentProgress from './components/TeacherViewStudentProgress'
import StudentDashboard from './components/StudentDashboard';
import StreakSlider from './components/Streak';

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './firebase.js';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    try {
      setUser(currentUser);
      console.log(currentUser);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/streak" element={<StreakSlider/>}></Route>
        <Route path="/teacherAdmin" element={<TeacherAdministration/>}></Route>
        <Route path="/badgesAdmin" element={<BadgeAdmin/>}></Route>
        <Route path="/rewardsAdmin" element={<RewardAdmin/>}></Route>
        <Route path="/rewardsAdminEdit" element={<RewardAdminEdit/>}></Route>
        {/* <Route path="/uploadReward" element={<UploadReward/>}></Route> */}
        <Route path="/editReward" element={<RewardAdminEdit/>}></Route>
        {/* <Route path="/teacherViewStudentProgress" element={<TeacherViewStudentProgress/>}></Route> */}
        <Route path="/studentDashBoard" element={<StudentDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
