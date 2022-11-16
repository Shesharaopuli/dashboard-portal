import React, { ReactNode, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from '../../../dashboard-portal/src/Interfaces/IUser';
import Login from './Login';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Dropdown, DropdownButton, Row, Stack } from 'react-bootstrap';
import { logout, setRefreshLogin } from "../features/user";
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import Users from './Users';
import Photos from './Photos';

function Dashboard() {
    const dispatch = useDispatch();
    const [showing, setShowing] = useState("users");
    const logoutUser = () => {
        dispatch(logout());
    };
    const loadUsers = () => {
        setShowing("users");
    };
    const loadPhotos = () => {
        setShowing("photos");
    };
    const user: IUser = useSelector((state: any) => state.user.value);
    console.log("user selector", user);

    if (!user.isLoggedIn) {
        return <Navigate replace to="/login" />;
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Dashboard Portal</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as
                            <DropdownButton id="dropdown-basic-button" title={user.name as ReactNode}>
                                <Dropdown.Item href="#" onClick={logoutUser}>Logout</Dropdown.Item>
                            </DropdownButton>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    <Col sm={2}>
                        <Nav defaultActiveKey="/" variant='pills' className="flex-column" style={{ marginTop: '20px' }}>
                            <Nav.Link eventKey="userLink" onClick={loadUsers}>Users</Nav.Link>
                            <Nav.Link eventKey="photoLink" onClick={loadPhotos}>Photos</Nav.Link>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        {showing === "users" && <Users />}
                        {showing === "photos" && <Photos />}
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Dashboard