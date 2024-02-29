import axios from "axios";
import {toast, Toaster} from 'react-hot-toast';
import {API} from "../components/API";
import {useState} from "react";
import {Button, ButtonGroup, Container, FormControl, FormLabel, InputGroup} from "react-bootstrap";
import {loader} from "../components/service";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function toaster() {
        toast.error("Parol yoki Username xato")
    }

    function login() {
        setLoading(true)
        axios.post(API + '/auth/login', {
            username: username,
            password: password,
        }).then(response => {
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                window.location.reload()
            } else {
                toaster()
            }
            setLoading(false);
        }).catch(error => {
            toaster()
            setLoading(false);
        })
    }

    return (
        <><Toaster
            position="top-center"
            reverseOrder={false}
        />
            <Container>
                <FormLabel>Login</FormLabel>
                <InputGroup>
                    <FormControl onChange={event => {
                        setUsername(event.target.value)
                    }} type={"text"} placeholder={"Login"}/>
                </InputGroup>
                <br></br>
                <FormLabel>Parol</FormLabel>
                <InputGroup>
                    <FormControl onChange={event => {
                        setPassword(event.target.value)
                    }} type={"text"} placeholder={"Parol"}/>
                </InputGroup>
                <br></br>
                <br></br>

                {
                    loading ? loader() :
                    <ButtonGroup>
                        <Button onClick={login}>Kirish</Button>
                    </ButtonGroup>
                }
            </Container>
        </>
    );
}

export default Login;
