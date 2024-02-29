import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, token} from "../../components/API";
import {FaSearch} from "react-icons/fa";

const ViewStudent = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        setLoading(true)
        axios.get(API + "/student/get-by-name?studentName=" + name, {
            headers: token
        })
            .then((response) => {
                setStudents(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }, []);

    return (
        <>
            <div className="example" style={{margin:"auto", maxWidth:"300px"}}>
                <input type="text"
                       placeholder="Search.."
                       name="search2"
                       onChange={event => setName(event.target.value)}
                />
                <button type="submit">
                    <FaSearch/>
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Ism-Familiya</th>
                    <th>Telefon</th>
                </tr>
                </thead>
                <tbody>
                {
                    loading ? <div className={"loader"}></div> :
                        students.map((student) => {
                            return (
                                <tr>
                                    <td>{student.fullName}</td>
                                    <td>{student.phone}</td>
                                </tr>
                            )
                        })
                }
                </tbody>
            </table>
        </>
    )
}

export default ViewStudent;