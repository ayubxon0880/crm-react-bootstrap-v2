import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {API, token} from "../components/API";
import {toaster, toasterContainer} from "../components/service";

function TopicForm() {
    const [topic,setTopic] = useState(null);

    function save() {
        axios.post(API+"/topic/save",{
            topic:topic
        },{
            headers:token
        }).then((response) => {
            toaster(200,response.data.message);
            document.getElementById("sda").value = "";
        }).catch((error) => {
            toaster(400,"Topic saqlanmadi");
        })
    }

    return(
        <Container>
            {toasterContainer()}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Topic ni kiriting</Form.Label>
                <Form.Control id={"sda"} as="textarea" rows={3} onChange={event => setTopic(event.target.value)}/>
            </Form.Group>
            <Button onClick={save}>Saqlash</Button>
        </Container>
    )
}

export default TopicForm;