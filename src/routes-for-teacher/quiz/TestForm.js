import React, {useEffect, useState} from "react";
import axios from "axios";
import {Toaster} from "react-hot-toast";
import {API, token} from "../../components/API";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import Select from "react-select";
import {loader, toaster} from "../../components/service";


const TestForm = () => {
    let quiz = new Map();
    const [loading, setLoading] = useState(true);
    const [testCount, setTestCount] = useState(0);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);

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
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        if (group !== null) {
            axios.get(API + "/student/group/" + group, {
                headers: token
            }).then(response => {
                setStudents(response.data);
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [group]);


    function handleGroup(event) {
        setGroup(event.value);
    }

    function handleAnswer(answer, id) {
        quiz.set(id, answer);
    }

    function saveQuiz() {
        setLoading(true);
        const tests = [];
        quiz.forEach((val,key) => {
            tests.push({id:key,correct:val});
        })

        console.log(tests);

        axios.post(API + "/quiz/save", {
            groupId: group,
            testCount: testCount,
            tests: tests
        },{
            headers:token
        }).then((response) => {
            toaster(response.data.status,response.data.message)
            setLoading(false);
        }).catch((error) => {
            toaster(0,"Xatolik yuz berdi qaytadan urinib ko'ring");
            setLoading(false);
        })
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Container>
                <Select
                    placeholder={"Guruxni tanlang"}
                    options={groups}
                    onChange={event => handleGroup(event)}
                />
                <br></br>
                <FormControl
                    type={"number"}
                    placeholder={"Umumiy testlar sonini tanlang"}
                    onChange={event => setTestCount(event.target.value)}
                />
                <br></br>
            </Container>
            <Table>
                <thead>
                <tr>
                    <th>O'quvchi</th>
                    <th>To'gri javob</th>
                </tr>
                </thead>
                <tbody>
                {
                    students.length === 0 ?
                        group === null ?
                            <tr>
                                <td>Iltimos guruxni tanlang</td>
                            </tr> :
                            <tr>
                                <td>O'quvchilar topilmadi</td>
                            </tr> :
                        students.map((student) => {
                            return (
                                <tr key={student.id}>
                                    <td style={{width: "70%"}}>{student.fullName}</td>
                                    <td style={{width: "30%"}}>
                                        <FormControl
                                            type={"number"}
                                            onChange={event => handleAnswer(event.target.value, student.id)}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                }
                </tbody>
            </Table>
            <Container>
                {
                    loading ? loader() : <Button onClick={saveQuiz}>Qo'shish</Button>
                }
            </Container>
        </>
    )
}

export default TestForm;