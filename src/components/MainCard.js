import {Container} from "react-bootstrap";
import React from "react";
import './maincard.css';
import Typed from "react-typed";
import 'bootstrap/dist/css/bootstrap.min.css';




const MainCard = (props) => {

    return (
        <Container style={{marginBottom: '80px',marginTop:'75px'}}>
            <img className='maincard__cont' src={props.mainCard.image} alt='IMAGE HERE'/>
            <h2 className='maincard__h2 mt-5'>
                <Typed
                    strings={[props.mainCard.title]}
                    typeSpeed={35}
                />
            </h2>
            <p className='maincard__p'>
                <Typed
                    strings={[props.mainCard.description]}
                    typeSpeed={35}
                />
            </p>
        </Container>
    );
}

export default MainCard;