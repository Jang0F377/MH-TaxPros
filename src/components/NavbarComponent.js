import React, {Component, useState} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import './Navbar.css';
import mhLogo from '../shared/mh-logo.png'
import {Alert} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmileBeam} from "@fortawesome/free-solid-svg-icons/faSmileBeam";
import {faCalendarCheck} from "@fortawesome/free-solid-svg-icons/faCalendarCheck";
import {faGrinWink} from "@fortawesome/free-solid-svg-icons/faGrinWink";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";


function NavbarComponent() {
    return (
        <>
            <Navbar className='navbar'  variant='dark' expand='md'>
                <Navbar.Brand href='/home'>
                    <img
                        className='navBrand'
                        src={mhLogo}
                        width='95%'
                        height='100px'
                        alt='IMAGE HERE'
                    />
                    <h1 className='navBrandText'>Tax Office of Michael Haney</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='my-auto me-auto mt-2'>
                        <NavLink to='/' className='navbar__links'>
                            <p className='navbar__links'>
                                Home
                            </p>
                        </NavLink>
                        <NavLink to='/about' className='navbar__links'>
                            <p className='navbar__links'>
                                About Us
                            </p>
                        </NavLink>
                        <NavLink to='/home' className='navbar__links' onClick={() => {
                            const anchor = document.querySelector('#apptCalendar')
                            anchor.scrollIntoView({behavior:'smooth',block:'start'})
                        }}>
                            <p className='navbar__links'>
                                Schedule
                            </p>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/*{AlertBar('2')}*/}
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
            );
        default:
            return(
                <div style={{fontSize: 'xx-large'}}>ALERT BANNER ERROR</div>
            )
    }

}



export default NavbarComponent;