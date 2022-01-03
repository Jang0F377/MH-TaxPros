import {Button, Col, Container, Row} from "react-bootstrap";
import React from "react";
import './maincard.css';
import Typed from "react-typed";
import 'bootstrap/dist/css/bootstrap.min.css';



const MainCard = (props) => {

    return (
        <Container style={{marginBottom: '80px',marginTop:'75px'}}>
            <img className='maincard__cont' src={props.mainCard.image} alt='IMAGE HERE'/>
            {/*<h2 className='maincard__h2 mt-4'>*/}
            {/*    <Typed*/}
            {/*        strings={[props.mainCard.title]}*/}
            {/*        typeSpeed={35}*/}
            {/*    />*/}
            {/*</h2>*/}
            {/*<p className='maincard__p'>*/}
            {/*    <Typed*/}
            {/*        strings={[props.mainCard.description]}*/}
            {/*        typeSpeed={35}*/}
            {/*    />*/}
            {/*</p>*/}
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