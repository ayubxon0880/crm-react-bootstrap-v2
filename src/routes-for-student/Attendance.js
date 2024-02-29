import {useEffect, useState} from 'react';
import axios from "axios";
import {API, token} from "../components/API";
import {getStyle, loader, toasterContainer, user} from "../components/service";
import Select from "react-select";
import Accordion from 'react-bootstrap/Accordion';
import {InputGroup, Table} from "react-bootstrap";

const Attendance = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get(API + "/group/student/" + user.id, {
            headers: token
        }).then(response => {
            const list = [];
            response.data.map((item) => {
                list.push({value: item.id, label: item.name});
            })
            setGroups(list);
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    function handleGroup(event) {
        axios.get(API + `/attendance/${event.value}?year=2024`, {
            headers: token
        }).then(response => {
            setData(response.data)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setData(null)
            setLoading(false);
        })
    }

    return (
        <>
            {toasterContainer()}
            <InputGroup>
                <Select
                    options={groups}
                    onChange={event => handleGroup(event)}
                    placeholder={"Guruxlar"}
                />
                <h5>Guruxingizni tanlang</h5>
            </InputGroup>
            <div>
                <Accordion defaultActiveKey="0">
                    {
                        loading ? loader() :
                            data === null || data.length === 0 ? <h1>Malumot topilmadi</h1> :
                                data.map((it) => {
                                    return (
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header
                                                style={{backgroundColor: '#343a40'}}>{it.month}</Accordion.Header>
                                            <Accordion.Body>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>Sana</th>
                                                        <th>Davomat</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        it.childAttendance.map((child) => {
                                                            return (
                                                                <tr>
                                                                    <td>{child.date}</td>
                                                                    <td style={getStyle(child.status)}>{child.status}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })
                    }
                </Accordion>

            </div>
        </>
    )
};

export default Attendance;
