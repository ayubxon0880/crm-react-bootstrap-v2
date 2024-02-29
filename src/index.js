import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import {AdminNavbar, PublicNavbar, StudentNavbar, TeacherNavbar} from "./components/PublicNavbar";

import Home from "./routes-for-student/Home";
import Login from "./unAuth/Login";
import Test from "./routes-for-student/Test";
import Payment from "./routes-for-student/Payment";
import Attendance from "./routes-for-student/Attendance";
import Reports from "./routes-for-student/Reports";
import Dashboard from "./routes-for-teacher/Dashboard";
import AttendanceForm from "./routes-for-teacher/attendance/AttendanceForm";
import TestForm from "./routes-for-teacher/quiz/TestForm";
import Menu from "./router-for-admin/Menu";
import GroupForm from "./router-for-admin/group/GroupForm";
import TeacherForm from "./router-for-admin/teacher/TeacherForm";
import StudentCreate from "./router-for-admin/student/StudentForm";
import GroupDetail from "./routes-for-teacher/GroupDetail";
import HomePage from "./unAuth/HomePage";
import ViewStudent from "./router-for-admin/student/ViewStudent";
import ViewTestResult from "./router-for-admin/ViewTestResult";
import ViewPayment from "./router-for-admin/payment/ViewPayment";
import ViewGroup from "./router-for-admin/group/ViewGroup";
import ViewTeacher from "./router-for-admin/teacher/ViewTeacher";
import Profile from "./routes-for-student/Profile";
import AddGroupStudent from "./router-for-admin/group/AddGroupStudent";
import TeacherProfile from "./routes-for-teacher/TeacherProfile";
import AttendancesView from "./routes-for-teacher/attendance/AttendanceView";
import TestView from "./routes-for-teacher/quiz/TestView";
import PaymentForm from "./router-for-admin/payment/PaymentForm";
import NewsView from "./router-for-admin/news/NewsView";
import UploadFiles from "./router-for-admin/news/NewsForm";
import NewsUnAuth from "./unAuth/NewsUnAuth";
import DeleteStudent from "./router-for-admin/student/DeleteStudent";
import Recorder from "./routes-for-student/challenge/Recorder";
import Voices from "./routes-for-student/challenge/Voices";
import TopicForm from "./routes-for-student/TopicForm";

const App = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    let teacher = false;
    let student = false;
    let admin = false;
    let publicRoutes = true;

    if (user !== null) {
        if (user.role.name === "ROLE_STUDENT") {
            student = true;

            teacher = false;
            admin = false;
            publicRoutes = false;
        } else if (user.role.name === "ROLE_TEACHER") {
            teacher = true;

            student = false;
            admin = false;
            publicRoutes = false;
        } else if (user.role.name === "ROLE_ADMIN" || user.role.name === "ROLE_SUPER_ADMIN") {
            admin = true;

            teacher = false;
            student = false;
            publicRoutes = false;
        } else {
            publicRoutes = true;
        }
    }

    return (
        <Router>
            {student ?
                <>
                    <StudentNavbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/tests" element={<Test/>}/>
                        <Route path="/challenge" element={<Recorder/>}/>
                        <Route path="/voices" element={<Voices/>}/>
                        <Route path="/create-topic" element={<TopicForm/>}/>
                        <Route path="/payment" element={<Payment/>}/>
                        <Route path="/attendance" element={<Attendance/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/about-programmer" element={<Reports/>}/>
                        <Route path='*' element={<Navigate to='/'/>}/>
                    </Routes>
                </>
                : teacher ?
                    <>
                        <TeacherNavbar/>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/attendances-view" element={<AttendancesView/>}/>
                            <Route path="/attendance-form" element={<AttendanceForm/>}/>
                            <Route path="/tests" element={<TestForm/>}/>
                            <Route path="/tests-view" element={<TestView/>}/>
                            <Route path="/profile" element={<TeacherProfile/>}/>
                            <Route path="/group-details" element={<GroupDetail/>}/>
                            <Route path="/delete-student" element={<DeleteStudent/>}/>
                            <Route path='*' element={<Navigate to='/'/>}/>
                        </Routes>
                    </>
                    : admin ?
                        <>
                            <AdminNavbar/>
                            <Routes>
                                <Route path="/" element={<Menu/>}/>
                                <Route path="/student-form" element={<StudentCreate/>}/>
                                <Route path="/teacher-form" element={<TeacherForm/>}/>
                                <Route path="/group-form" element={<GroupForm/>}/>
                                <Route path="/payment-form" element={<PaymentForm/>}/>
                                <Route path="/news-form" element={<UploadFiles/>}/>
                                <Route path="/add-to-group" element={<AddGroupStudent/>}/>
                                <Route path="/view-students" element={<ViewStudent/>}/>
                                <Route path="/view-teachers" element={<ViewTeacher/>}/>
                                <Route path="/view-groups" element={<ViewGroup/>}/>
                                <Route path="/view-payments" element={<ViewPayment/>}/>
                                <Route path="/view-test-results" element={<ViewTestResult/>}/>
                                <Route path="/view-news" element={<NewsView/>}/>
                                <Route path="/delete-student" element={<DeleteStudent/>}/>
                                <Route path='*' element={<Navigate to='/'/>}/>
                            </Routes>
                        </> : publicRoutes ?
                            <>
                                <PublicNavbar/>
                                <Routes>
                                    <Route path="/" element={<HomePage/>}/>
                                    <Route path="/public-news" element={<NewsUnAuth/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path='*' element={<Navigate to='/'/>}/>
                                </Routes>
                            </> : <></>
            }
        </Router>
    )
}


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);