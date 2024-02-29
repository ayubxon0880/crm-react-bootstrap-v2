import React, {useState} from "react";
import {Button, Card, Container, ListGroup} from "react-bootstrap";
import Confetti from "react-confetti";

function Reports() {
    const [cong, setCong] = useState(false);

    return (
        <>
            {cong ? <Confetti/> : <></>}
            <Container className={"d-flex justify-content-center align-items-center"}>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>Dasturchi bilan bog'laning</Card.Title>
                        <Card.Text>
                            Saytdagi kamchilik, taklif va shikoyatlaringizni menga bildiring
                            <ListGroup>
                                <ListGroup.Item><a href={"https://t.me/ayubxonobidov"}>Telegram :
                                    ayubxonobidov</a></ListGroup.Item>
                                <ListGroup.Item><a href={"https://www.instagram.com/ayubxon.1401/"}>Instagram :
                                    ayubxon.1401</a></ListGroup.Item>
                                <ListGroup.Item><a href={"https://www.threads.net/@ayubxon.1401"}>Threads :
                                    ayubxon.1401</a></ListGroup.Item>
                                <ListGroup.Item><a href={"https://www.linkedin.com/in/ayubxon-obidov-752b6626b/"}>LinkedIn
                                    : Ayubxon Obidov</a></ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                        <Button onClick={event => setCong(!cong)}>Touch me</Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Reports;
