import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";
import Select from "react-select";
import {Button, FormControl, InputGroup, Table} from "react-bootstrap";
import {loader, toaster} from "../../components/service";

const TestView = () => {
    const [loading, setLoading] = useState(true);
    const [quiz, setquiz] = useState([]);
    const [groups, setGroups] = useState([]);
    const [group, setGroupId] = useState(null);
    const [firstDate, setFirstDate] = useState(null);

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

    function getData() {
        if (!(group === null || firstDate === null)) {
            axios.get(API + "/quiz/group/" + group + "?first=" + firstDate, {
                headers: token
            }).then((response) => {
                setquiz(response.data);
                setLoading(false)
            }).catch((error) => {
                console.log(error);
            })
        } else {
            toaster(0,"Gurux va sanani tanlang")
        }
    }

    const handleChangeGroup = event => {
        setGroupId(event.value);
    };

    return (
        <>
            <InputGroup>
                <Select
                    options={groups}
                    onChange={event => handleChangeGroup(event)}
                />
                <FormControl type={"date"} onChange={event => setFirstDate(event.target.value)}/>
                <Button onClick={getData}>Izlash</Button>
            </InputGroup>

            <Table>
                <thead>
                <tr>
                    <th>Ism</th>
                    <th>Test</th>
                    <th>To'gri javoblar</th>
                    <th>Xato javoblar</th>
                </tr>
                </thead>
                <tbody>
                {
                    quiz.length !== 0 ?
                        loading ? loader() :
                            quiz.map(it =>
                                <tr>
                                    <td>{it.student.fullName}</td>
                                    <td>{it.testCount}</td>
                                    <td>{it.correct}</td>
                                    <td>{it.wrongAnswer}</td>
                                </tr>
                            )
                        : <>Malumot topilmadi</>
                }
                </tbody>
            </Table>
        </>
    );
}

export default TestView;