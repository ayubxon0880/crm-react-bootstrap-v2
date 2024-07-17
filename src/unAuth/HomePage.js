import about from "./images/about.jpg";
import about1 from "./images/about-1.jpg";
import contact from "./images/contact.png";
import cefr from "./images/logo-cefr.png";
import ielts from "./images/IELTS.png";
import onatili_adabiyot from "./images/onatiliadabiyot.jpg";
import tarix from "./images/tarix.jpeg";
import huquq from "./images/huquq2.png";
import ahadjon from "./images/ahadjon.jpg";
import murodjon from "./images/murodjon.jpeg";
import azizbek from "./images/azizbek.jpg";
import React, {useState} from "react";
import axios from "axios";
import {API} from "../components/API";
import {toast, Toaster} from "react-hot-toast";
import {Button, Container} from "react-bootstrap";
import Confetti from "react-confetti";

const HomePage = () => {
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [message, setMessage] = useState(null);
    const [cong, setCong] = useState(false);

    function toaster(status) {
        if (status === 200) {
            toast.success("Xabar yuborildi. Siz bilan tez orada bog'lanamiz");
        } else {
            toast.error("Xabar yuborilmadi");
        }
    }

    function sendMessage() {
        console.log(message);
        axios.post(API + "/mail/send", {
            name,
            phone,
            message
        }).then((reponse) => {
            toaster(200);
        }).catch((error) => {
            toaster(403)
        })
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {cong ? <Confetti/> : <></>}
            <Container>
                <Button onClick={event => setCong(!cong)}>{cong ? "Congratulations" : "CLICK ME :)"}</Button>
            </Container>
            <h1>I hav no idea for home page huh (because this site's frontend side created by backend developer). This site does not need a home page.</h1>
        </>
    )
}

export default HomePage;