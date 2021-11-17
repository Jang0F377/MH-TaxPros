import React, {Component, useState} from "react";
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './Navbar.css';
import mhLogo from '../shared/mh-logo.png'
import {Alert} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmileBeam} from "@fortawesome/free-solid-svg-icons/faSmileBeam";
import {faCalendarCheck} from "@fortawesome/free-solid-svg-icons/faCalendarCheck";
import {faGrinWink} from "@fortawesome/free-solid-svg-icons/faGrinWink";


function NavbarComponent() {
    return (
        <>
            <Navbar className='navbar' expand='sm'>
                <Navbar.Brand href='/' className='navbar__logo'>
                    <img
                        src={mhLogo}
                        width='95%'
                        height='105px'
                        alt='IMAGE HERE'
                    />
                </Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href='/' className='navbar__links'>
                        Home
                    </Nav.Link>
                    <Nav.Link href='/' className='navbar__links'>
                        About Us
                    </Nav.Link>
                    <Nav.Link href='/' className='navbar__links'>
                        Contact Us
                    </Nav.Link>
                </Nav>
            </Navbar>
            {AlertBar('2')}

        </>

    )
}


const AlertBar = (alert) => {
    switch (alert) {
        case "1":
            return(
                <Alert style={{textAlign:"center", fontSize:"1rem"}} severity='warning'>
                    Michael's schedule fills up very quickly, schedule an appointment
                    while they are still available  <a href='/'> <FontAwesomeIcon icon={faCalendarCheck}/></a>
                </Alert>
            );
        case "2":
            return (
                <Alert style={{textAlign:"center",fontSize:'1rem'}} severity='info' >
                    Michael has <b>NOT</b> opened his schedule for bookings yet.
                    Please check back around the beginning of January! <FontAwesomeIcon icon={faSmileBeam}/>
                </Alert>
            );
        case "3":
            return(
                <Alert style={{textAlign:"center",fontSize:'1rem'}} severity='error'>
                    Michael's schedule is currently filled, he will open more appointments soon.
                    Please remember to book early! <FontAwesomeIcon icon={faGrinWink}/>
                </Alert>
            )
    }

}



export default NavbarComponent;