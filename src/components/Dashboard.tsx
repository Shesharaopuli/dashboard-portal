import React, { ReactNode, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from '../../../dashboard-portal/src/Interfaces/IUser';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { logout } from "../features/user";
import { Navigate } from 'react-router-dom';
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
                        <Nav activeKey={showing} variant='pills' className="flex-column" style={{ marginTop: '20px' }}>
                            <Nav.Link eventKey="users" onClick={loadUsers}>Users</Nav.Link>
                            <Nav.Link eventKey="photos" onClick={loadPhotos}>Photos</Nav.Link>
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