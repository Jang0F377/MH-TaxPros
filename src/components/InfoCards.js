import './infocards.css';
import {Col, Container, Row} from "react-bootstrap";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';


function InfoCards(props) {
    return (
        <div className='info__row'>
            {props.homecards.map(card => {
                return (
                    <Col key={card.id} className='info__col'>
                        <RenderCard item={card} className='addMargin'/>
                    </Col>

                );
            })}
        </div>

    );
}

function RenderCard ({item}) {
    return(
        <div className='card__main' >
            <CardMedia
                style={{borderRadius:'8px'}}
                component='img'
                alt='Picture Here'
                height='150'
                image={item.image}
            />
            <CardContent>
                <h6 className='typo__card'>
                    {item.title}
                </h6>
                <p className='typo__body'>
                    {item.description}
                </p>
            </CardContent>
            <CardActions>
                <Button size='small' href={item.href}>Learn More</Button>
            </CardActions>
        </div>
    );
}

export default InfoCards;