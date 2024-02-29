import React, {useEffect, useState} from "react";
import axios from "axios";

const ViewGroup = () => {
    const [groups,setGroups] = useState([]);
    const [name,setName] = useState("");
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  /*
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/group/pagination?groupName="+name,{
            headers:headers
        })
            .then((response) => {
                setGroups(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [name]);
*/
    return (
        <>
            <input type={"text"} onChange={event => setName(event.target.value)}/>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Telefon</th>
                    <th>Ustoz</th>
                </tr>
                </thead>
                <tbody>
                {
                    groups.map((group) => {
                        return (
                            <tr>
                                <td>{group.direction}</td>
                                <td>{group.phone}</td>
                                <td>{group.teacherId}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    )
}

export default ViewGroup;