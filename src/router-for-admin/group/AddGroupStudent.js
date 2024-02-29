import {toast, Toaster} from "react-hot-toast";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";

const AddGroupStudent = () => {
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [id, setId] = useState(null);
    const [studentId, setStudentId] = useState(null);
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");


    useEffect(() => {
        axios.get(API + '/group/direction-all', {
            headers: token
        }).then(response => {
            let list = [{}];
            response.data.map(item => list.push({value: item.id, label: item.name}));
            setGroups(list);
            setLoading1(false)
        }).catch((err) => {
            console.log(err.data);
            setLoading1(false)
        })
    }, []);


    function toaster(message,status) {
        if (status === 200){
            toast.success(message);
        } else {
            toast.error(message);
        }
    }

    function search() {
        setLoading2(true);
        axios.get(API + '/student/get-by-name?studentName=' + name, {
            headers: token
        }).then(response => {
            setStudents(response.data);
            if (students === null){
                toaster("O'quvchi topilmadi",403)
            }
            setLoading2(false);
        }).catch((err) => {
            console.log(err.data);
            toaster("O'quvchi topilmadi",403)
            setLoading2(false);
        })
    }


    function handleGroup(event) {
        setId(event.value);
    }

    function handleStudent(event) {
        setStudentId(event.value);
    }

    function save() {
        axios.post(API + '/student/add-group?studentId=' + studentId + "&groupId=" + id, {},{
            headers: token
        })
            .then((response) => {
                setStudents(response.data);
                toaster("Malumot saqlandi",200)
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                toaster("Malumot saqlanmadi",403)
            })

    }


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {
                loading1 ? <div className={"loader"}></div> :
                    <div>
                        <ul className="form-style-1">
                            <li>
                                {
                                    groups === null ? <></> :
                                        <>
                                            <label>Ustoz</label>
                                            <Select
                                                options={groups}
                                                onChange={handleGroup}
                                            />
                                        </>
                                }
                            </li>
                            <li>
                                <label>O'quvchilar</label>
                                <input type={"text"}
                                       className={"test-form-input"}
                                       required
                                       placeholder={"O'quvchi ismini kiriting"}
                                       onChange={event => setName(event.target.value)}
                                />
                                {
                                    loading2 ? <div className={"loader"}></div> :
                                        <input type={"button"}
                                               value={"Qidirish"}
                                               className={"test-form-input"}
                                               onClick={search}
                                        />
                                }
                                {
                                    students.length === 0 ? <></> :
                                        <>
                                            <label>O'quvchilar</label>
                                            <Select
                                                options={students}
                                                onChange={handleStudent}
                                            />
                                        </>
                                }
                            </li>
                            <li>
                                <input type={"button"}
                                       value={"Qo'shish"}
                                       className={"test-form-input"}
                                       onClick={save}
                                />
                            </li>
                        </ul>
                    </div>
            }
        </>
    )
}

export default AddGroupStudent;