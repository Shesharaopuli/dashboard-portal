import React, { ReactNode, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from '../../../dashboard-portal/src/Interfaces/IUser';
import Login from './Login';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { logout, setRefreshLogin } from "../features/user";
import { Navigate, useNavigate } from 'react-router-dom';
import "./Dashboard.css";

function Dashboard() {
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
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

        </>
    )
}

export default Dashboard