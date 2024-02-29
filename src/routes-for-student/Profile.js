import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../components/API";
import {Button, Card, Container, ListGroup, Table} from "react-bootstrap";
import {loader} from "../components/service";


const Profile = () => {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get(API + "/student/get-me", {
            headers: token,
        }).then((response) => {
            setStudent(response.data);
        }).catch((error) => {
            console.log(error.data);
        })
    }, []);

    return (
        student ?
        <Container>
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{student.fullName}</Card.Title>
                    <Card.Text>
                        <ListGroup>
                            <ListGroup.Item>Telefon : {student.phone}</ListGroup.Item>
                            <ListGroup.Item>Status : {student.status === "IN_PROGRESS" ? "O'qimoqda" : "Yakunlagan"}</ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                    <Button variant="primary">Tahrirlash</Button>
                </Card.Body>
            </Card>
            <Table>
                <thead>
                <tr>
                    <th>Guruh</th>
                    <th>Ustoz</th>
                    <th>Telefon</th>
                </tr>
                </thead>
                <tbody>
                {
                    student === null ? loader() : student.group.map((it) => {
                        return (
                            <tr>
                                <td>{it.name}</td>
                                <td>{it.teacher}</td>
                                <td>{it.phone}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </Container> : loader()
    );
}

export default Profile;