import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../components/API";
import {Card, Container, ListGroup, Table} from "react-bootstrap";
import {loader} from "../components/service";


const Profile = () => {
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        axios.get(API + "/teacher/get-me", {
            headers: token,
        }).then((response) => {
            setTeacher(response.data);
            // setTimeout(() => {
            // }, 1400)
        }).catch((error) => {
            console.log(error.data);
        })
    }, []);

    return (
        teacher !== null ?
        <Container>
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{teacher.fullName}</Card.Title>
                    <Card.Text>
                        <ListGroup>
                            <ListGroup.Item>Telefon : {teacher.phone}</ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Table>
                <thead>
                <tr>
                    <th></th>
                    <th>Guruh</th>
                </tr>
                </thead>
                <tbody>
                {
                    teacher.groups.map((group) => {
                        return (
                            <tr>
                                <td>{group.id}</td>
                                <td>{group.name}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </Container> : loader
    );
}

export default Profile;