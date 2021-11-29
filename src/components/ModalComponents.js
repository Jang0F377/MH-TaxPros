import {Col, Container, Modal, Row} from "react-bootstrap";
import React from "react";
import './modalcomponent.css';
import * as Yup from 'yup'
import {Form, Formik, useField} from "formik";
import styled from "@emotion/styled";
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled components ....
const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
`;

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
                <div className="error">{meta.error}</div>
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
                <StyledErrorMessage>{meta.error}</StyledErrorMessage>
            ) : null}
        </>
    );
};

const bookAppointmentSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2,'Too Short!')
        .max(15,'Must be 15 Characters or less')
        .required('Required'),
    lastName: Yup.string()
        .min(2,'Too Short!')
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
            <Modal.Header closeButton className='bg-warning'>
                <Modal.Title style={{fontWeight:'bold',fontSize:'2rem'}}>Book Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-success'>
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
                            <Row>
                                <Col md={3} className='mx-auto my-auto'>First Name</Col>
                                <Col className='m-2 p-1'>
                                    <MyTextInput
                                        name='firstName'
                                        type='text'
                                        placeholder='Jane'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} className='mx-auto my-auto'>Last Name</Col>
                                <Col className='m-2 p-1'>
                                    <MyTextInput
                                        name='lastName'
                                        type='text'
                                        placeholder='Doe'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} className='mx-auto my-auto'>Email Address</Col>
                                <Col className='m-2 p-1'>
                                    <MyTextInput
                                        name='email'
                                        type='email'
                                        placeholder='youremail@righthere.com'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3} className='mx-auto my-auto'>Appointment Type</Col>
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