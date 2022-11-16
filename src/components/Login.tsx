import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from "react-bootstrap";
import * as yup from "yup";
import "./Login.css";
import { IUser } from "../../../dashboard-portal/src/Interfaces/IUser";
import { login } from "../features/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const getUserFromStorage = (): IUser[] => {
    let users: string | null = localStorage.getItem("users");
    if (!users) {
        users = JSON.stringify([{
            id: 1,
            name: "Admin",
            email: "admin@example.com",
            password: "Admin",
            isLoggedIn: false,
            createdAt: new Date(),
        }]);
        localStorage.setItem("users", users);
    }
    return JSON.parse(users);
}

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().required("Email is required").email("Invalid format"),
        password: yup.string().required("Password is required").min(4).max(20),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: "onBlur",
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: any) => {
        const users: IUser[] = getUserFromStorage();
        if (!users) {
            alert("No users data set in your local storage.");
            return false;
        }
        const accountFound = users.find((user) => user.email === data.email);
        // usually, we never reveal which part of credentials are wrong but for instance 
        if (!accountFound) {
            alert("This email doen't exist on the system");
            return false;
        }
        if (accountFound.password !== data.password) {
            alert("Invalid Password");
            return false;
        }
        console.log("Success login");
        dispatch(login(accountFound));
        return navigate("/dashboard");
    };
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4} sm={9} xs={12}>
                    <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="text-center text-warning">Dashboard Portal</h3>
                        <br />
                        <br />
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" {...register("email")} />
                            {errors.email?.message && (
                                <Form.Text className="text-danger">
                                    {errors.email?.message as ReactNode}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" {...register("password")} />
                            {errors.password?.message && (
                                <Form.Text className="text-danger">
                                    {errors.password?.message as ReactNode}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login