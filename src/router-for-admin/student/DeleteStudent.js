import React, {useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";
import {Toaster} from "react-hot-toast";
import Select from "react-select";
import {loader, toaster} from "../../components/service";
import {Button, FormControl} from "react-bootstrap";

const DeleteStudent = () => {
    const [loading2, setLoading2] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");

    function search() {
        setLoading2(true);
        axios.get(API + '/student/get-by-name?studentName=' + name, {
            headers: token
        }).then(response => {
            setStudents(response.data);
            if (students === null) {
                toaster(403,"O'quvchi topilmadi");
            }
            setLoading2(false);
        }).catch((err) => {
            console.log(err.data);
            toaster(403,"O'quvchi topilmadi");
            setLoading2(false);
        })
    }

    function handleStudent(event) {
        setStudentId(event.value);
    }

    function deleteStudent() {
        setLoading2(true);
        axios.delete(API + '/student/'+studentId,{
            headers: token
        }).then((response) => {
            if (response.data.status === 200){
                toaster("Muvaffaqiyatli o'chirildi");
            }
            setLoading2(false);
        }).catch((error) => {
            toaster(JSON.stringify(error.response.data));
            setLoading2(false);
        })
    }


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div>
                        <FormControl type={"text"}
                               required
                               placeholder={"O'quvchi ismini kiriting"}
                               onChange={event => setName(event.target.value)}
                        />
                        {
                            loading2 ? loader() :
                                <Button onClick={search}>Qidirish</Button>
                        }
                        {
                            students.length === 0 ? <></> :
                                <>
                                    <Select
                                        options={students}
                                        onChange={handleStudent}
                                    />
                                </>
                        }
                <Button onClick={deleteStudent}>O'chirish</Button>
            </div>
        </>
    )
}

export default DeleteStudent;