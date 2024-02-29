import React, {useEffect, useState} from "react";
import axios from "axios";
import {Toaster} from "react-hot-toast";
import {API, token} from "../../components/API";
import Select from "react-select";
import {Button, Container, FormLabel, InputGroup, Table} from "react-bootstrap";
import {loader, toaster} from "../../components/service";

const AttendanceForm = () => {
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [students, setStudents] = useState(null);
    const list = new Map();

    const options = [
        {value: 'Qatnashdi', label: 'Qatnashdi'},
        {value: 'Qatnashmadi', label: 'Qatnashmadi'},
        {value: 'Sababli', label: 'Sababli'},
    ];

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
        if (groupId !== null) {
            axios.get(API + "/student/group/" + groupId, {
                headers: token
            }).then(response => {
                setStudents(response.data);
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [groupId]);

    function handleChange(event, id) {
        list.set(id, event.value);
    }

    const handleGroup = (event) => {
        setGroupId(event.value);
    }

    function postData() {
        setLoading2(true);
        const attendance = [];

        list.forEach((val, key) => {
            attendance.push({id: key, status: val});
        })

        axios.post(API + "/attendance/save",
            {
                groupId: groupId,
                attendances: attendance
            },
            {
                headers: token
            })
            .then((response) => {
                setLoading2(false);
                toaster(200,response.data.message);
            })
            .catch((error) => {
                setLoading2(false);
                toaster(403,"Davomat qilingan");
            })
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <InputGroup>
                <Select
                    options={groups}
                    onChange={event => handleGroup(event)}
                />
                <FormLabel>Guruxni tanlang</FormLabel>
            </InputGroup>
            <Table>
                <thead>
                <tr>
                    <th>Ism</th>
                    <th>Davomat</th>
                </tr>
                </thead>
                <tbody>
                {
                    students === null || students.length === 0 ? groupId === null ? <h1>Guruxni tanlang</h1> : <h1>Malumot topilmadi</h1> : students.map((item) => {
                        list.set(item.id, "Qatnashdi");
                        return (
                            <tr key={item.id}>
                                <td width={"50%"}>{item.fullName}</td>
                                <td width={"90%"}>
                                    <Select
                                        classNames={{
                                            control: (state) =>
                                                state.isFocused ? 'border-red-600' : 'border-grey-300',
                                        }}
                                        style={{width: "100%"}}
                                        options={options}
                                        defaultValue={options[0]}
                                        onChange={event => {
                                            handleChange(event, item.id)
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <Container className={"d-flex justify-content-center align-items-center"}>
                {
                    loading2 ? loader() :
                        <Button onClick={postData}>Saqlash</Button>
                }
            </Container>
        </>
    )
}

export default AttendanceForm;