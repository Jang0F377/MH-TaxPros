import {Col, Container, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import './modalcomponent.css';
import * as Yup from 'yup'
import {ErrorMessage, Form, Formik, useField} from "formik";
import styled from "@emotion/styled";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Divider} from "@mui/material";

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
    email: Yup.string('Enter your email')
        .email('Enter a valid email')
        .required('Required'),
    appointmentType: Yup.string()
        .oneOf(
            ['In Person','Virtual Appointment', 'Business Appointment','Consultation/Discuss My Situation']
        )
        .required('Required')
})

export const BookAppointmentModal = (props) => {
    return(
        <Modal show={props.isOpen} onHide={props.toggle}>
            <Modal.Header closeButton style={{background:'rgba(0,110,0,1)'}}>
                <Modal.Title style={{fontWeight:'bold',fontSize:'2rem',color:'gold'}}>Book Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'rgba(255,255,255,1)'}}>
                <Container>
                    <Row>
                        <Col className='date-time-col'>
                            <h3 style={{textAlign:'center',textDecoration:'underline'}}>Date</h3>
                            <h4 style={{textAlign:'center',marginTop:'6px'}}>{props.chosenDate.split('T')[0]}</h4>
                        </Col>
                        <Col className='date-time-col'>
                            <h3 style={{textAlign:'center',textDecoration:'underline'}}>Time</h3>
                            {props.chosenDate
                                ? <h4 style={{textAlign:'center',marginTop:'6px'}}>{props.chosenDate.split('T')[1].split('-')[0]}</h4>
                                : <h4 style={{textAlign:'center',marginTop:'6px'}}>{''}</h4>
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
                            appointmentType: ""
                        }}
                        validationSchema={bookAppointmentSchema}
                        onSubmit={(values) => {
                            alert(JSON.stringify(values,null,2));
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
        </Modal>
    );
}



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
