import React, {useState} from "react";
import Select from "react-select";
import axios from "axios";
import {API, token} from "../../components/API";

const PaymentForm = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [student, setStudent] = useState(null);
    const [group, setGroup] = useState(null);
    const [payment, setPayment] = useState(null);
    const [date, setDate] = useState(null);

    const handleChangeForStudent = (val) => {
        setStudent(val.value);
        getGroups(val.value);
    }

    const handleChangeForGroup = (val) => {
        setGroup(val.value);
    }

    function getStudents() {
        axios.get(API + "/student/get-by-name?studentName="+studentName, {
            headers:token
        }).then((response) => {
            setStudents(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    function getGroups(id) {
        axios.get(API + "/group/student/"+id, {
            headers:token
        }).then((response) => {
            const list = [];
            response.data.map((it) => {
                list.push({value:it.id,label:it.name})
            })
            setGroups(list);
        }).catch((error) => {
            console.log(error);
        })
    }


    function savePayment() {

    }

    return (
        <>
            <div>
                <ul className="form-style-1">
                    <li>
                        <input type={"text"}
                               className={"test-form-input"}
                               required
                               placeholder={"O'quvchi ismini kiriting"}
                               onChange={event => setStudentName(event.target.value)}
                        />
                        <button className={"button-14"} onClick={getStudents}>Izlash</button>
                    </li>
                    <li>
                        <label>O'quvchi</label>
                        <Select
                            options={students}
                            onChange={handleChangeForStudent}
                            id={"student"}
                        />
                    </li>
                    <li>
                        <label>Gurux</label>
                        <Select
                            options={groups}
                            onChange={handleChangeForGroup}
                            id={"group"}
                        />
                    </li>
                    <li>
                        <label>To'lov</label>
                        <input type={"number"}
                               className={"test-form-input"}
                               required
                               onChange={event => setPayment(event.target.value)}
                               id={"payment"}
                        />
                    </li>
                    <li>
                        <label>To'lov sanasi</label>
                        <input type={"date"}
                               className={"test-form-input"}
                               required
                               onChange={event => setDate(event.target.value)}
                               id={"date"}
                        />
                    </li>
                    <li>
                        {
                            loading ? <div className={"loader"}></div> :
                                <input type={"button"}
                                       value={"Qo'shish"}
                                       className={"test-form-input"}
                                       onClick={savePayment}
                                />
                        }
                    </li>
                </ul>
            </div>
        </>
    );
}

export default PaymentForm;