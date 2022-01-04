import './contactcomponent.css';
import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkedAlt, faPhone,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {Avatar} from "@mui/material";
import NavbarComponent from "./NavbarComponent";
import BlankFooter from "./BlankFooter";


function ContactComponent() {

    return(
        <div>
            <NavbarComponent/>
            <Container className='mb-4'>
                <Row style={{marginTop:'1.3rem'}}>
                    <h1 className='my__h1'>
                        GET IN TOUCH
                    </h1>

                </Row>
                <Row style={{alignItems:'center'}}>
                    <Col style={{textAlign:'center'}}>
                        <Avatar sx={{width:50,height:50,marginLeft:'auto',marginRight:'auto',marginTop:'0.2em',marginBottom:'0.5em',bgcolor:'goldenrod'}}><FontAwesomeIcon icon={faMapMarkedAlt} size={"lg"}/></Avatar>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                        <Avatar sx={{width:50,height:50,marginLeft:'auto',marginRight:'auto',marginTop:'0.2em',marginBottom:'0.5em',bgcolor:'goldenrod'}}><FontAwesomeIcon icon={faPhone} size={"lg"}/></Avatar>
                    </Col>
                    <Col>
                        <Avatar sx={{width:50,height:50,marginLeft:'auto',marginRight:'auto',marginTop:'0.2em',marginBottom:'0.5em',bgcolor:'goldenrod'}}><FontAwesomeIcon icon={faEnvelope} size={"lg"}/></Avatar>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <h1 className='my__h2'>ADDRESS</h1>
                    </Col>
                    <Col xs={4}>
                        <h1 className='my__h2'>PHONE</h1>
                    </Col>
                    <Col xs={4}>
                        <h1 className='my__h2'>EMAIL</h1>
                    </Col>
                </Row>
                <Row className='mb-4'>
                    <Col xs={4}>
                        <p className='my__p'>
                            8460 S. Eastern Ave. Suite A<br/>
                            Las Vegas, NV 89123<br/>
                            Northeast corner of Eastern and Wigwam
                        </p>
                    </Col>
                    <Col xs={4}>
                        <h5 className='my__p'>
                            Cell/Primary
                        </h5>
                        <p className='my__p'>
                            <a style={{color:'white'}} className='my__p' href='tel:+17022776916'> 702-277-6916</a><br/>
                            Text OR Call
                        </p>
                    </Col>
                    <Col xs={4}>
                        <p className='my__p'>
                            <a style={{color:'white'}} className='my__p' href='mailto:michael@mhtaxpro.com'>michael@mhtaxpro.com</a>
                        </p>
                    </Col>
                </Row>
                <Row style={{textAlign:'center'}}>
                    <h5>
                        To Book an Appointment with Bradley Maloff<br/>
                        Go to <a href='https://gcmtaxpros.fullslate.com' style={{color:'white'}}>gcmtaxpros.fullslate.com</a>
                    </h5>
                </Row>
            </Container>
            <BlankFooter/>
        </div>
    );


}


export default ContactComponent;