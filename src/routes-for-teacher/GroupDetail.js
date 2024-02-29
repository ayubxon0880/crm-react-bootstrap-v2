import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../components/API";
import Accordion from "react-bootstrap/Accordion";
import {Card, Container, ListGroup, Table} from "react-bootstrap";
import {loader, toaster} from "../components/service";
import Select from "react-select";


const GroupDetail = () => {
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);

    function generateDays() {
        let days = [];
        let grDays = group.days.split("/");
        for (let i = 0; i < grDays.length; i++) {
            if (grDays[i] === "du") {
                days.push("Dushanba");
            } else if (grDays[i] === "se") {
                days.push("Seshanba");
            } else if (grDays[i] === "chor") {
                days.push("Chorshanba");
            } else if (grDays[i] === "pay") {
                days.push("Payshanba");
            } else if (grDays[i] === "juma") {
                days.push("Juma");
            } else if (grDays[i] === "sha") {
                days.push("Shanba");
            } else if (grDays[i] === "yak") {
                days.push("Yakshanba");
            }
        }

        return days;
    }

    useEffect(() => {
        axios.get(API + "/group/teacher", {
            headers: token
        }).then((response) => {
            const groups = [];
            response.data.map((item) => {
                groups.push({value:item,label:item.direction});
            })
            setGroups(groups);
        }).catch((error) => {
            toaster(0, "Qaytadan urinib ko'ring")
        })
    }, []);

    useEffect(() => {
        if (group !== null) {
            axios.get(API + '/student/group/' + group.id, {
                headers: token
            }).then(r => {
                setStudents(r.data);
                setLoading(false);
            }).catch((err) => {
                setStudents([]);
                setLoading(false);

            })
        }
    }, [group]);


    return (
        <>
            <Select
                options={groups}
                onChange={event => setGroup(event.value)}
            />
            {
                loading ? loader() :
                    <>
                        <Container className={"d-flex justify-content-center align-items-center"}>
                            <Card style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title>{group.direction}</Card.Title>
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item>Boshlanish : {group.start}</ListGroup.Item>
                                            <ListGroup.Item>Tugash : {group.end}</ListGroup.Item>
                                            <ListGroup.Item>To'lov : {group.payment}</ListGroup.Item>
                                            <ListGroup.Item>Dars kunlari : {generateDays().join(" ")}</ListGroup.Item>
                                            <ListGroup.Item>O'quvchilar soni : {students.length}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                        {
                            students.length === 0 ? <h1>O'quvchilar topilmadi</h1> :
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>O'quvchilar</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    <th>Ism</th>
                                                    <th>Telefon</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    students.length === 0 ? <h1>O'quvchilar yo'q</h1> :
                                                        students.map((student) => {
                                                            return (
                                                                <tr>
                                                                    <td>{student.fullName}</td>
                                                                    <td>{student.phone}</td>
                                                                </tr>
                                                            );
                                                        })
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                        }
                    </>
            }
        </>
    )
}

export default GroupDetail;