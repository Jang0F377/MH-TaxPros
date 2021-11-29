import {Avatar, Box, Card, CardContent, Divider} from "@mui/material";
import './servicecards.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faCoins, faBuilding,faLandmark} from "@fortawesome/free-solid-svg-icons";
import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function ServiceCards(props) {
    return(
        <div>
            <div>
                <Row className='indiv__cont'>
                    <Col xs={12} md className='m-2 p-4'>
                        <RenderIndividualCard service={props.services[0]}/>
                    </Col>
                    <Col xs={12} md className='m-2 p-4'>
                        <RenderBusinessCard service={props.services[1]}/>
                    </Col>
                </Row>
            </div>
            <Container className='mx-auto'>
                <Row>
                    <Col xs={12} className='mx-auto p-5'>
                        <RenderTrustCard service={props.services[2]}/>
                    </Col>
                </Row>
            </Container>
        </div>


    );

}


const RenderTrustCard = ({service}) => {
    return (
        <div className='cardstyle'>
            <div className='trust__card' >
                <CardContent className='cc_trust'>
                    <Avatar className='avatarstyle'>
                        <FontAwesomeIcon icon={faLandmark}/>
                    </Avatar>
                    <h3 className='headingstyle'>{service.title}</h3>
                    <p className='card-description'>{service.description}</p>
                </CardContent>
                <Divider light/>
                <Box display={'flex'}>
                    <Box p={2} flex={'auto'} >
                        <h2 className='h2-styling'>Starting Price:</h2>
                        <h2>{service.price}</h2>
                        <p>per Trust</p>
                    </Box>
                    <Box p={2} flex={'auto'}>
                        <h2 className='h2-styling'>Generally takes:</h2>
                        <h2>{service.time}</h2>
                        <p>per Trust</p>
                    </Box>
                </Box>
            </div>
        </div>

    );
    
}

const RenderBusinessCard = ({service}) => {
    return (
        <div >
            
            <div className='cardstyle'>
                <CardContent className='cc_busi'>
                    <Avatar className='avatarstyle'>
                        <FontAwesomeIcon icon={faBuilding}/>
                    </Avatar>
                    <h3 className='headingstyle'>{service.title}</h3>
                    <p className='card-description'>{service.description}</p>
                </CardContent>
                <Divider light/>
                <Box display={'flex'}>
                    <Box p={2} flex={'auto'}>
                        <h2 className='h2-styling'>Starting Price:</h2>
                        <h2>{service.price}</h2>
                        <p>per Business</p>
                    </Box>
                    <Box p={2} flex={'auto'}>
                        <h2 className='h2-styling'>Generally takes:</h2>
                        <h2>{service.time}</h2>
                        <p>per Business</p>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

const RenderIndividualCard = ({service}) => {
    return (
        <div className='cardstyle'>
            <CardContent className='cc_busi'>
                <Avatar className='avatarstyle'>
                    <FontAwesomeIcon icon={faDollarSign}/>
                    <FontAwesomeIcon icon={faCoins}/>
                </Avatar>
                <h3 className='headingstyle'>{service.title}</h3>
                <p className='card-description'>{service.description}</p>
            </CardContent>
            <Divider light/>
            <Box display={'flex'}>
                <Box p={2} flex={'auto'}>
                    <h2 className='h2-styling'>Starting Price:</h2>
                    <h2>{service.price}</h2>
                    <p>per Person</p>
                </Box>
                <Box p={2} flex={'auto'}>
                    <h2 className='h2-styling'>Generally takes:</h2>
                    <h2>{service.time}</h2>
                    <p>per Person</p>
                </Box>
            </Box>
        </div>

    );
}

export default ServiceCards;