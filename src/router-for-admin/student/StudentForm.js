import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";
import Select from 'react-select'
import {API, token} from "../../components/API";

const StudentCreate = () => {
    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState(null);
    // const [phone, setPhone] = useState(null);
    // const [username, setUsername] = useState(null);
    // const [password, setPassword] = useState("");
    const [groups, setGroups] = useState(null);
    const [studentGroups, setStudentGroup] = useState();

    useEffect(() => {
        axios.get(API + '/group/direction-all', {
            headers: token
        }).then(response => {
            const inf = [];
            response.data.map((item) => {
                inf.push({value: item.id, label: item.name})
            })
            setGroups(inf);
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

    function saveStudent() {
        setLoading(true);
        axios.post(API + "/student", {
            fullName,
            // phone,
            groups: studentGroups,
            // password,
            // username,
        }, {
            headers: token
        }).then((response) => {
            setFullName(null);
            // setPhone(null);
            // setUsername(null);
            // setPassword("");
            document.getElementById("fullName").value = "";
            setLoading(false);
            // document.getElementById("phone").value = "";
            // document.getElementById("login").value = "";
            // document.getElementById("password").value = "";
            toaster(true, response.data.message)
        }).catch((error) => {
            console.log(error.data);
            setLoading(false);
            toaster(false, JSON.stringify(error.response.data))
        })

    }

    const handleChange = (val) => {
        const newVal = [];
        for (let i = 0; i < val.length; i++) {
            newVal.push(val[i].value);
        }
        setStudentGroup(newVal);
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
                        <label>O'quvchi ismi va familiyasi</label>
                        <input type={"text"}
                               className={"test-form-input"}
                               required
                               id={"fullName"}
                               onChange={event => setFullName(event.target.value)}
                        />
                    </li>
                    {/*<li>*/}
                    {/*    <label>Telefon raqam</label>*/}
                    {/*    <input type={"number"}*/}
                    {/*           className={"test-form-input"}*/}
                    {/*           required*/}
                    {/*           id={"phone"}*/}
                    {/*           onChange={event => setPhone(event.target.value)}*/}
                    {/*    />*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <label>Login</label>*/}
                    {/*    <input type={"text"}*/}
                    {/*           className={"test-form-input"}*/}
                    {/*           required*/}
                    {/*           id={"login"}*/}
                    {/*           onChange={event => setUsername(event.target.value)}*/}
                    {/*    />*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <label>Parol</label>*/}
                    {/*    <input type={"text"}*/}
                    {/*           className={"test-form-input"}*/}
                    {/*           required*/}
                    {/*           id={"password"}*/}
                    {/*           onChange={event => setPassword(event.target.value)}*/}
                    {/*    />*/}
                    {/*</li>*/}
                    <li>
                        <label>Guruhni tanlang</label>
                        {
                            groups === null ? <></> :
                                <Select
                                    options={groups}
                                    onChange={handleChange}
                                    isMulti
                                    id={"groups"}
                                />
                        }
                    </li>
                    <li>
                        {
                            loading
                                ?
                                <div className={"loader"}></div>
                                :
                                <input type={"button"}
                                       value={"Qo'shish"}
                                       className={"test-form-input"}
                                       onClick={saveStudent}
                                />
                        }
                    </li>
                </ul>
            </div>
        </>
    );
}

export default StudentCreate;
