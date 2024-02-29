import {Button, Container, Nav, Navbar} from "react-bootstrap";
import React from "react";
import {NavbarDataForAdmin, NavbarDataForStudent, NavbarDataForTeacher, PublicNavbarData} from "./NavbarData";
import {logout, logoWhite, username} from "./service";

const navbarColor = {backgroundColor: '#445fb7'};
const navbarLink = {color:'white'};

export function PublicNavbar() {
    return (
        <>
            <Navbar style={navbarColor} collapseOnSelect expand="sm" variant="light" className="mb-3">
                <Navbar.Brand href="#">
                    <img
                        src={logoWhite}
                        width="90%"
                        height="35"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle style={navbarLink} aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            PublicNavbarData.map((item) => {
                                return (
                                    <Nav.Link key={item.path} style={navbarLink} href={item.path}>{item.title}</Nav.Link>
                                )
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link style={navbarLink} href="/login">Kirish</Nav.Link>
                    <Nav.Link style={{color:"#445fb7"}} href="/login">Kirish</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}


export function StudentNavbar() {
    return (
        <>
            <Navbar style={navbarColor} expand="lg">
                <Container>
                    <Navbar.Brand style={navbarLink} href="/">{username()}</Navbar.Brand>
                    <Navbar.Toggle style={navbarLink} aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {
                                NavbarDataForStudent.map((item) => {
                                    return (
                                        <Nav.Link key={item.path} style={navbarLink} href={item.path}>{item.title}</Nav.Link>
                                    )
                                })
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Button onClick={logout} className={"btn-danger"}>Chiqish</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export function TeacherNavbar() {

    return (
        <>
            <Navbar style={navbarColor} expand="lg">
                <Container>
                    <Navbar.Brand href="/" style={navbarLink}>{username()}</Navbar.Brand>
                    <Navbar.Toggle style={navbarLink} aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {
                                NavbarDataForTeacher.map((item) => {
                                    return (
                                        <Nav.Link key={item.path} style={navbarLink} href={item.path}>{item.title}</Nav.Link>
                                    )
                                })
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Button onClick={logout} className={"btn-danger"}>Chiqish</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export function AdminNavbar() {

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">{username()}</Navbar.Brand>
                    <Navbar.Toggle style={navbarLink} aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {
                                NavbarDataForAdmin.map((item) => {
                                    return (
                                        <Nav.Link key={item.path} style={navbarLink} href={item.path}>{item.title}</Nav.Link>
                                    )
                                })
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
