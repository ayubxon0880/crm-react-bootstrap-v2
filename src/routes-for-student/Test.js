import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../components/API";
import Select from "react-select";
import {InputGroup, Table} from "react-bootstrap";
import {loader, toaster, toasterContainer, user, years} from "../components/service";

function Test() {
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleYear = event => {
        setSelectedYear(event.value);
        setLoading(true);
    };

    const handleGroup = event => {
        setSelectedGroup(event.value);
        setLoading(true);
    };

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

    useEffect(() => {
        if (selectedGroup === null || selectedYear == null) {
            if (selectedGroup === null && selectedYear == null) {
                toaster(300, "Yil va Guruxni tanlang")
            }
        } else {
            axios.get(API + '/quiz/student', {
                headers: token
            }).then(response => {
                setData(response.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err)
                setData(null)
                setLoading(false);
            })
        }
    }, [selectedYear, selectedGroup]);


    function getDegree(testCount, correct) {
        const degree = (100/testCount) * correct;
        if (degree > 80){
            return {color:{backgroundColor:"#0af30a"}, degree:"A'lo"}
        } else if (degree > 60) {
            return {color:{backgroundColor:"#ffdd00"}, degree:"Yaxshi"}
        } else if (degree > 50) {
            return {color:{backgroundColor:"#ee5605"}, degree:"Qoniqarli"}
        } else {
            return {color:{backgroundColor:"#ff0000"}, degree:"Yomon"}
        }
    }

    return (
        <>
            {toasterContainer()}

            <InputGroup>
                <Select
                    options={years}
                    onChange={(event) => handleYear(event)}
                    placeholder={"Yil"}
                />
                <Select
                    options={groups}
                    onChange={(event) => handleGroup(event)}
                    placeholder={"Guruxni tanlang"}
                />
            </InputGroup>
            <Table>
                <thead>
                <tr>
                    <th>Sana</th>
                    <th>Test soni</th>
                    <th>To'g'ri javoblar</th>
                    <th>Daraja</th>
                </tr>
                </thead>
                <tbody>
                {
                    loading ? loader() :
                        data === null || data.length === 0 ? <h1>Malumot topilmadi</h1> :
                            data.map((item) => {
                                const degree = getDegree(item.testCount,item.correct);
                                return (
                                    <tr>
                                        <td>{item.testDate}</td>
                                        <td>{item.testCount}</td>
                                        <td>{item.correct}</td>
                                        <td style={degree.color}>{degree.degree}</td>
                                    </tr>
                                );
                            })
                }
                </tbody>
            </Table>
        </>
    );
}

export default Test;
