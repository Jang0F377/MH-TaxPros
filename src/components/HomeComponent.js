import React, {Component} from "react";
import './Home.css';
import {Card, CardActionArea, CardContent, CardMedia, Container, Typography} from "@mui/material";


const HomeCards = (props) => {
    return (
        <div>
            {props.homeCards.map(card => {
                return (
                    <Card key={card.id}>
                        <CardActionArea>
                            <CardMedia
                                component='img'
                                height='100'
                                image={card.image}
                                alt='Place Image Here'
                            />
                            <CardContent>
                                <Typography className='bodycard__title' variant='h5' component='div'>
                                    {card.title}
                                </Typography>
                                <Typography className='bodycard__body' variant='body2' color='text.secondary'>
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}
        </div>
    );
}

export default HomeCards;

