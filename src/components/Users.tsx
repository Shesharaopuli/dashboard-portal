import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Table } from 'react-bootstrap';

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
interface IUserWeb {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
        "street": string,
        "suite": string,
        "city": string,
        "zipcode": string,
        "geo": {
            "lat": string,
            "lng": string
        }
    },
    "phone": string,
    "website": string,
    "company": {
        "name": string,
        "catchPhrase": string,
        "bs": string
    }
}

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(USERS_URL).then((response) => {
            setUsers(response.data);
        });
    }, []);

    if (users.length < 1) {
        return <div>No Users</div>;
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Street</th>
                    <th>Suite</th>
                    <th>City</th>
                    <th>Zip</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: IUserWeb, index) => {
                    return (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.address?.street}</td>
                            <td>{user.address?.suite}</td>
                            <td>{user.address?.city}</td>
                            <td>{user.address?.zipcode}</td>
                            <td>{user.phone}</td>
                            <td>{user.website}</td>
                            <td>{user.company?.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default Users;