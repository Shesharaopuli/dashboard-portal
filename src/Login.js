import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from "react-bootstrap";
import * as yup from "yup";
import "./Login.css";

function Login() {
    let schema = yup.object().shape({
        email: yup.string().required("Email is required").email("Invalid format"),
        // Password, we can add lot here but this is for login and not for registation purpose (hard coded user info)
        password: yup.string().required("Password is required").min(4).max(20),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        reValidateMode: "onBlur",
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log(data);
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
                                    {errors.email?.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" {...register("password")} />
                            {errors.password?.message && (
                                <Form.Text className="text-danger">
                                    {errors.password?.message}
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
    );
}
export default Login;
