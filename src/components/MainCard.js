import {Container} from "@mui/material";
import React from "react";
import './maincard.css';
import Typed from "react-typed";



const MainCard = (props) => {

    return (
        <Container style={{marginBottom: '80px',marginTop:'75px'}}>
            <img className='maincard__cont' src={props.mainCard.image} alt='IMAGE HERE'/>
            <h2 className='maincard__h2'>
                <Typed
                    strings={[props.mainCard.title]}
                    typeSpeed={35}
                />
            </h2>
            <p className='maincard__p'>
                <Typed
                    strings={[props.mainCard.description]}
                    typeSpeed={20}
                />
            </p>
        </Container>
    );
}

export default MainCard;