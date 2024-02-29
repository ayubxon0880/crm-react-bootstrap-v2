import React, {useEffect,  useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";
import {FormControl, InputGroup, Table} from "react-bootstrap";
import Select from "react-select";
import {getStyle, loader, months} from "../../components/service";
import Accordion from "react-bootstrap/Accordion";

const AttendancesView = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedForGroup, setSelectedGroup] = useState(null);
    const [selectedForMonth, setSelectedMonth] = useState(null);
    const [attendances, setAttendances] = useState([]);
    const [day,setDay] = useState(null);

    useEffect(() => {
        axios.get(API + "/group/teacher", {
            headers: token
        }).then(response => {
            const list = [];
            // eslint-disable-next-line array-callback-return
            response.data.map((item) => {
                list.push({value: item.id, label: item.direction});
            })
            setGroups(list);
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        setLoading(true);
        if (selectedForGroup !== null && selectedForMonth != null && day != null) {
            axios.get(API + "/attendance/group/" + selectedForGroup + "?month=" + selectedForMonth + "&day="+day, {
                headers: token
            }).then((response) => {
                setAttendances(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error.response);
            })
        } else {
            console.log("not working");
        }
    }, [selectedForMonth, selectedForGroup,day]);

    const handleChangeForGroup = event => {
        setSelectedGroup(event.value);
    };

    const handleChangeForMonth = event => {
        setSelectedMonth(event.value);
    };


    return (
        <>
            <div>
                <InputGroup>
                    <Select
                        options={groups}
                        onChange={event => handleChangeForGroup(event)}
                    />
                    <Select
                        options={months}
                        onChange={event => handleChangeForMonth(event)}
                    />

                    <FormControl type={"number"} placeholder={"kun"} onChange={event => setDay(event.target.value)}/>
                </InputGroup>

                <Accordion defaultActiveKey="0">
                    {
                        loading ? loader() :
                            attendances === null || attendances.length === 0 ? <h1>Malumot topilmadi</h1> :
                                attendances.map((it) => {
                                    return (
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header
                                                style={{backgroundColor: '#343a40'}}>{it.date}</Accordion.Header>
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
                                                        it.attendanceSmallDTO.map((child) => {
                                                            return (
                                                                <tr>
                                                                    <td>{child.student}</td>
                                                                    <td style={getStyle(child.attendance)}>{child.attendance}</td>
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
    );
}
export default AttendancesView;