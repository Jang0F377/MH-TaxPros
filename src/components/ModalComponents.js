import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './modalcomponent.css';
import * as Yup from 'yup'
import {Form, Formik, useField} from "formik";
import styled from "@emotion/styled";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Divider, TextareaAutosize} from "@mui/material";
import 'yup-phone';
import {bookAppointmentEndpoint, myHeaders} from "./CalendarComponent";
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer,toast} from "react-toastify";
import {CONSTANTS} from "../constants";


//Styled Components
const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error text-danger' style={{fontWeight:'bold'}}>{meta.error}</div>
            ) : null}
        </>
    );
};
const MyTextAutosizeInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <TextareaAutosize className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error text-danger' style={{fontWeight:'bold'}}>{meta.error}</div>
            ) : null}
        </>
    );
};

//YUP Appointment Schema
const bookAppointmentSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2,'Must be at least 2 Characters!')
        .max(15,'Must be 15 Characters or less')
        .required('Required'),
    lastName: Yup.string()
        .min(2,'Must be at least 2 Characters!')
        .max(35,'Too Long')
        .required('Required'),
    phone: Yup.string()
        .phone('US', true)
        .required(),
    email: Yup.string('Enter your email')
        .email('Enter a valid email')
        .required('Required'),
    notes: Yup.string()
        .min(2, 'Note must have at least 2 characters')
        .max(150, 'Max 150 Characters')
});

const successToast = () => toast.success("Appointment Successfully Booked! Please check your email for a confirmation!", {
    position: 'bottom-center',
    theme: "dark",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick:true,
    pauseOnHover:false,
    draggable:false
});

const errorToast = () => toast.error("Booking Unsuccessful. Sorry, Please try again! ", {
    position: 'bottom-center',
    theme: "dark",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick:true,
    pauseOnHover:false,
    draggable:false
});

export const BookAppointmentModal = (props) => {
    const [newChosenDate,setNewChosenDate] = useState('');
    const [apptBooked,setApptBooked] = useState(false);
    const [errorBooking, setErrorBooking] = useState(false);
    const reload = () => window.location.reload();
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }



    useEffect(() => {
        setNewChosenDate(props.chosenDate);
        if (apptBooked) {
            successToast();
        }
        if (errorBooking) {
            errorToast();
        }

    },[apptBooked,errorBooking, props.chosenDate])


    const bookAppointment = (firstName,lastName,email,phone,notes) => {
        console.log('Launching Booking Flow!');
        let raw = JSON.stringify({
            "at": newChosenDate,
            "services": [
                1
            ],
            "employee": 4351,
            "client_with_creation": {
                "first_name": `${firstName}`,
                "last_name": `${lastName}`,
                "phone_number": {
                    "number": `${phone}`,
                    "contact_type": "WORK"
                },
                "email": `${email}`,
                "birthday": "1980-09-12",
                "no_automatic_email": false,
                "no_sms": false,
                "mass_email_opt_in": true,
                "sms_reminder_consent": true,
                "address": {
                    "street1": "",
                    "street2": "",
                    "city": "",
                    "state": "",
                    "postal_code": ""
                },
                "time_zone": "Pacific Time (US & Canada)"
            },
            "notes": `${notes}`
        });
        // Headers
        const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${CONSTANTS.API_KEY}`);
            myHeaders.append("Content-Type","application/json");
            myHeaders.append("Accept", "application/json");
        let postRequestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(bookAppointmentEndpoint,postRequestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "STATUS_BOOKED") {
                    console.log(result);
                    setApptBooked(true);
                } else {
                    console.log(result.errors);
                    setErrorBooking(true);
                }

            })
            .catch(error => {
                console.error("ERROR: ",error);
                setErrorBooking(true);
            });
    };

    return(
        <Modal show={props.isOpen} onHide={props.toggle} animation={true} style={{borderRadius: '10px'}} id='myModal'>
            <Modal.Header closeButton style={{background:'rgba(0,110,0,1)'}}>
                <Modal.Title style={{fontWeight:'bold',fontSize:'2rem',color:'gold'}} className='modal__title'>Book Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'rgba(255,255,255,1)'}}>
                <Container>
                    <Row>
                        <Col className='date-time-col'>
                            <h3 style={{textAlign:'center',textDecoration:'underline'}}>Date</h3>
                            {newChosenDate
                                ? <h4 style={{textAlign:'center',marginTop:'6px'}}>{newChosenDate.split('T')[0]}</h4>
                                : <h4 style={{textAlign:'center',marginTop:'6px'}}>ERR</h4>

                            }
                        </Col>
                        <Col className='date-time-col'>
                            <h3 style={{textAlign:'center',textDecoration:'underline'}}>Time</h3>
                            {newChosenDate
                                ? <h4 style={{textAlign:'center',marginTop:'6px'}}>{newChosenDate.split('T')[1].substring(0,5)}</h4>
                                : <h4 style={{textAlign:'center',marginTop:'6px'}}>ERR</h4>
                            }
                        </Col>
                    </Row>
                </Container>
                <Divider/>
                <Container>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            notes: "",
                        }}
                        validationSchema={bookAppointmentSchema}
                        onSubmit={async (values) => {
                            let first = values.firstName;
                            let last = values.lastName;
                            let email = values.email;
                            let phone = values.phone;
                            let notes = values.notes
                            bookAppointment(first,last,email,phone,notes);
                            await sleep(7000);
                            reload();


                        }}>
                        <Form>
                            <Row className='row_content'>
                                <Col md={3} className='mt-2 p-1'>First Name</Col>
                                <Col className='m-2 p-1'>
                                    <MyTextInput
                                        id='firstName'
                                        name='firstName'
                                        type='text'
                                        placeholder='Jane'
                                    />
                                </Col>
                            </Row>
                            <Row className='row_content'>
                                <Col md={3} className='mt-2 p-1'>Last Name</Col>
                                <Col className='m-2 p-1'>
                                    <MyTextInput
                                        id='lastName'
                                        name='lastName'
                                        type='text'
                                        placeholder='Doe'
                                    />
                                </Col>
                            </Row>
                            <Row className='row_content'>
                                <Col md={3} className='mt-2 p-1'>Phone</Col>
                                <Col className='m-2 p-1'>
                                    <MyTextInput
                                        id='phone'
                                        name='phone'
                                        type='tel'
                                        placeholder='702-123-4567'
                                    />
                                </Col>
                            </Row>
                            <Row className='row_content'>
                                <Col md={3} className='mt-2 p-1'>Email Address</Col>
                                <Col className='m-2 p-1'>
                                    <MyTextInput
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='youremail@here.com'
                                    />
                                </Col>
                            </Row>
                            <Row className='row_content'>
                                <Col sm={3} className='mt-2 p-1'>Notes</Col>
                                <Col className='m-2 p-1'>
                                    <MyTextAutosizeInput
                                        minRows={3}
                                        maxRows={5}
                                        id='notes'
                                        name='notes'
                                        type='text'
                                        placeholder='Any Notes (Optional)'
                                    />
                                </Col>
                            </Row>
                            <button className='bg-dark text-light p-2 mt-4'> Book Appointment</button>
                        </Form>
                    </Formik>
                </Container>
            </Modal.Body>
            <ToastContainer/>
        </Modal>
    );
};

