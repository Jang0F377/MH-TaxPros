import {Container} from "@mui/material";
import React from "react";
import './maincard.css';



const MainCard = (props) => {

    return (
        <Container style={{marginBottom: '80px',marginTop:'75px'}}>
            <img className='maincard__cont' src={props.mainCard.image} alt='IMAGE HERE'/>
            <h2 className='maincard__h2'>
                {props.mainCard.title}
            </h2>
            <p className='maincard__p'>{props.mainCard.description}</p>
        </Container>
    );
}

export default MainCard;