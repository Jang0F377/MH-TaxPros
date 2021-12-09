import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './modalcomponent.css';
import * as Yup from 'yup'
import {Form, Formik, useField} from "formik";
import styled from "@emotion/styled";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Divider} from "@mui/material";
import 'yup-phone';
import {API_KEY, bookAppointmentEndpoint, myHeaders} from "./CalendarComponent";
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer,toast} from "react-toastify";

const delay = millisec => new Promise(res => setTimeout(res, millisec));

//Styled Components
const StyledLabel = styled.label`
  margin-top: 1rem;
`;
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
const MySelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
            <select {...field} {...props} />
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
    appointmentType: Yup.string()
        .oneOf(
            ['In Person','Virtual Appointment', 'Business Appointment','Consultation/Discuss My Situation']
        )
        .required('Required')
});

const successToast = () => toast.success("Appointment Successfully Booked!", {
    position: 'bottom-center',
    theme: "dark",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick:true,
    pauseOnHover:false,
    draggable:false
});
const errorToast = () => toast.error("Booking Unsuccessful. Please try again! ", {
    position: 'bottom-center',
    theme: "dark",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick:true,
    pauseOnHover:false,
    draggable:false
});

const successCheckmark = () => {
    return (
        <div className="animation-ctn">
            <div className="icon icon--order-success svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
                    <g fill="none" stroke="#22AE73" strokeWidth="2">
                        <circle cx="77" cy="77" r="72"
    style={{strokeDashArray:"480px, 480px", strokeDashOffset: "960px"}}/>
                        <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72"
    style={{strokeDashArray:"480px, 480px", strokeDashOffset: "960px"}}/>
                        <polyline className="st0" stroke="#fff" strokeWidth="10"
                                  points="43.5,77.8 63.7,97.9 112.2,49.4 "
                                  style={{strokeDashArray:"100px, 100px", strokeDashOffset: "200px"}}/>
                    </g>
                </svg>
            </div>
        </div>

    );
}


export const BookAppointmentModal = (props) => {
    const [newChosenDate,setNewChosenDate] = useState('');
    const [apptBooked,setApptBooked] = useState(false);
    const [errorBooking, setErrorBooking] = useState(false);
    useEffect(() => {
        setNewChosenDate(props.chosenDate);
        if (apptBooked) {
            successToast();
            console.log('SUCCESS')
        }
        if (errorBooking) {
            errorToast();
        }
    },[apptBooked,errorBooking, props.chosenDate])


    const bookAppointment = (firstName,lastName,email,phone,apptType) => {
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
            "notes": `${apptType}`
        });
        // Headers
        const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${API_KEY}`);
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
        <Modal show={props.isOpen} onHide={props.toggle} animation={true} style={{borderRadius: '10px'}}>
            <Modal.Header closeButton style={{background:'rgba(0,110,0,1)'}}>
                <Modal.Title style={{fontWeight:'bold',fontSize:'2rem',color:'gold'}}>Book Appointment</Modal.Title>
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
                            appointmentType: "",
                        }}
                        validationSchema={bookAppointmentSchema}
                        onSubmit={async (values) => {
                            let first = values.firstName;
                            let last = values.lastName;
                            let email = values.email;
                            let phone = values.phone;
                            let apptType = values.appointmentType
                            bookAppointment(first,last,email,phone,apptType);
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
                                <Col sm={3} className='mt-2 p-1'>Appointment Type</Col>
                                <Col className='m-2 p-1'>
                                    <MySelect name='appointmentType'>
                                        <option value=''>Select an Appointment Type</option>
                                        <option value='In Person'>In Person</option>
                                        <option value='Virtual Appointment'>Virtual Appointment</option>
                                        <option value='Business Appointment'>Business Appointment</option>
                                        <option value='Consultation/Discuss My Situation'>Consultation/Discuss My Situation</option>
                                    </MySelect>
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

// const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
//     const [field, meta] = useField(props);
//
//     // Show inline feedback if EITHER
//     // - the input is focused AND value is longer than 2 characters
//     // - or, the has been visited (touched === true)
//     const [didFocus, setDidFocus] = useState(false);
//     const handleFocus = () => setDidFocus(true);
//     const showFeedback =
//         (!!didFocus && field.value.trim().length > 2) || meta.touched;
//
//     return (
//         <div
//             className={`form-control ${
//                 showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
//             }`}
//         >
//             <div className="flex items-center space-between">
//                 <label htmlFor={props.id}>{label}</label>{' '}
//                 {showFeedback ? (
//                     <div
//                         id={`${props.id}-feedback`}
//                         aria-live="polite"
//                         className="feedback text-sm"
//                     >
//                         {meta.error ? meta.error : '✓'}
//                     </div>
//                 ) : null}
//             </div>
//             <input
//                 {...props}
//                 {...field}
//                 aria-describedby={`${props.id}-feedback ${props.id}-help`}
//                 onFocus={handleFocus}
//             />
//             <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
//                 {helpText}
//             </div>
//         </div>
//     );
// };
