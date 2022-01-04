import {Button, Col, Container, Row} from "react-bootstrap";
import React from "react";
import './maincard.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const MainCard = (props) => {

    return (
        <Container style={{marginBottom: '80px',marginTop:'75px'}}>
            <img className='maincard__cont' src={props.mainCard.image} alt='Not Loading'/>
            <Row className='mt-5'>
                <Col className='display__col'>
                    <Button size='lg' variant='success' href='https://www.irs.gov/refunds' className='check_buttons'>
                        CHECK MY REFUND
                    </Button>
                </Col>
                <Col className='display__col'>
                    <Button size='lg' variant='success' href='https://www.irs.gov/filing/wheres-my-amended-return' className='check_buttons'>
                        CHECK MY AMENDED RETURN
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default MainCard;