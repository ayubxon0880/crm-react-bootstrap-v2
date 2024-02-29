import React, {useState} from "react";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";
import {API, token} from "../../components/API";

const TeacherForm = () => {
    const [fullName, setFullName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState("");

    function toaster(isSuccess, message) {
        if (isSuccess) {
            toast.success(message)
        } else {
            if (message.length < 1){
                toast.error("Malumotlar xato iltimos qaytadan urinib ko'ring")
            } else {
                toast.error(message)
            }
        }
    }


    function saveData() {
        axios.post(API+"/teacher", {
                fullName,
                phone,
                username,
                password
            }, {
                headers: token
            }
        ).then((response) => {
            toaster(true,response.data.message)
            setFullName(null);
            setPhone(null);
            setUsername(null);
            setPassword("");
            document.getElementById("fullName").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }).catch((error) => {
            toaster(false,JSON.stringify(error.response.data))
        })
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
                        <label>Ustoz ismi va familiyasi</label>
                        <input type={"text"}
                               id={"fullName"}
                               className={"test-form-input"}
                               onChange={event => setFullName(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Telefon raqam</label>
                        <input type={"number"}
                               id={"phone"}
                               className={"test-form-input"}
                               onChange={event => setPhone(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Login</label>
                        <input type={"text"}
                               id={"username"}
                               className={"test-form-input"}
                               onChange={event => setUsername(event.target.value)}
                        />
                    </li>
                    <li>
                        <label>Parol</label>
                        <input type={"text"}
                               id={"password"}
                               className={"test-form-input"}
                               onChange={event => setPassword(event.target.value)}
                        />
                    </li>
                    <li>
                        <input type={"button"}
                               className={"test-form-input"}
                               value={"Qo'shish"}
                               onClick={saveData}
                        />
                    </li>
                </ul>
            </div>
        </>
    );
}

export default TeacherForm;