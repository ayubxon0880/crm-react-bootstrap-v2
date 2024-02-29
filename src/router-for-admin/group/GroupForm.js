import {toast, Toaster} from "react-hot-toast";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";

const GroupForm = () => {
    const [loading, setLoading] = useState(false);
    const [direction, setDirection] = useState(null);
    const [payment, setPayment] = useState(null);
    const [degree, setDegree] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [days, setDays] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [teachers, setTeachers] = useState(null);

    useEffect(() => {
        axios.get(API + '/teacher/all', {
            headers: token
        }).then(response => {
            const teachers = [];
            response.data.map((item) => {
                teachers.push({value: item.id, label: item.fullName})
            })
            setTeachers(teachers);
            setTimeout(function () {
                console.log("asd");
            }, 1500)
        }).catch((err) => {
            console.log(err.data);
        })
    }, []);

    function toaster(isSuccess, message) {
        if (isSuccess) {
            toast.success(message)
        } else {
            if (message.length < 3) {
                toast.error("Malumotlar xato iltimos qaytadan urinib ko'ring")
            } else {
                toast.error(message)
            }
        }
    }

    function saveGroup() {
        setLoading(true);
        axios.post(API + "/group", {
            direction,
            payment,
            degree,
            teacherId: teacher,
            startTime,
            days,
            endTime
        }, {
            headers: token
        }).then((response) => {
            setDirection(null);
            setPayment(null);
            setDegree(null);
            setStartTime(null);
            setEndTime(null);
            setDays(null);
            document.getElementById("direction").value = "";
            document.getElementById("payment").value = "";
            document.getElementById("startTime").value = "";
            document.getElementById("endTime").value = "";
            setLoading(false);
            toaster(true, response.data.message)
        }).catch((error) => {
            toaster(false, JSON.stringify(error.response.data))
            setLoading(false);
        })

    }

    const handleChange = (val) => {
        const newVal = [];
        for (let i = 0; i < val.length; i++) {
            newVal.push(val[i].value);
        }
        setDays(newVal.join("/"));
    }

    const weekDays = [
        {value: "du", label: "Dushanba"},
        {value: "se", label: "Seshanba"},
        {value: "chor", label: "Chorshanba"},
        {value: "pay", label: "Payshanba"},
        {value: "juma", label: "Juma"},
        {value: "sha", label: "Shanba"},
        {value: "yak", label: "Yakshanba"}
    ];

    const handleChangeForTeacher = (val) => {
        setTeacher(val.value);
        console.log(teacher);
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div>
                <ul className="form-style-1">
                    <li>
                        <label>Guruh nomi</label>
                        <input type={"text"}
                               className={"test-form-input"}
                               required
                               id={"direction"}
                               onChange={event => setDirection(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>To'lov</label>
                        <input type={"number"}
                               className={"test-form-input"}
                               required
                               id={"payment"}
                               onChange={event => setPayment(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Dars boshlanish vaqti</label>
                        <input type={"time"}
                               className={"test-form-input"}
                               required
                               id={"startTime"}
                               onChange={event => setStartTime(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Dars tugash vaqti</label>
                        <input type={"time"}
                               className={"test-form-input"}
                               required
                               id={"endTime"}
                               onChange={event => setEndTime(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Dars kunlari</label>
                        <Select
                            options={weekDays}
                            onChange={handleChange}
                            isMulti
                            id={"days"}
                        />
                    </li>
                    <li>
                        {
                            teachers === null ? <></> :
                                <>
                                    <label>Ustoz</label>
                                    <Select
                                        options={teachers}
                                        onChange={handleChangeForTeacher}
                                        id={"teachers"}
                                    />
                                </>
                        }
                    </li>
                    <li>
                        {
                            loading ? <div className={"loader"}></div> :
                            <input type={"button"}
                                   value={"Qo'shish"}
                                   className={"test-form-input"}
                                   onClick={saveGroup}
                            />
                        }
                    </li>
                </ul>
            </div>
        </>
    )
}

export default GroupForm;