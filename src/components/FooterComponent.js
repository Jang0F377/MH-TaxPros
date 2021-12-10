import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";


const FooterComponent = () => {


    return (
        <footer style={{background:"rgba(0,75,0,1)"}}>
            <Container>
                <Row>
                    <Col style={{textAlign:'center'}}>
                        <h4 style={{textDecoration:'underline',color:'gold'}} className='mt-3'>
                            CONTACT US
                        </h4>
                        <h5 style={{color:'white'}} className='mt-4'>Email</h5>
                        <p><a style={{textDecoration:'none',color:'gold'}} href='mailto:michael@mhtaxpro.com'>michael@mhtaxpro.com</a></p>
                        <h5 style={{color:'white'}} className='mt-3'>Phone</h5>
                        <Row>
                            <Col style={{textAlign:'right'}}>
                                <p style={{textDecoration:'none',color:'gold'}}>Cell:
                                    <a style={{textDecoration:'none',color:'gold'}} href='tel:+17022776916'> 702-277-6916</a>
                                </p>
                            </Col>
                            <Col style={{textAlign:'left'}}>
                                <p style={{textDecoration:'none',color:'gold'}}>Office: <a style={{textDecoration:'none',color:'gold'}} href='tel:+17022776916'>702-566-0920</a></p>
                            </Col>
                        </Row>
                        <h5 style={{color:'white'}} className='mt-2'>Office Address</h5>
                        <p style={{color:'gold'}}>
                            8460 S. Eastern Ave Suite A<br/>
                            Las Vegas, NV 89123
                            <br/>
                            We are located on the NE corner of Eastern and Wigwam!
                        </p>


                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default FooterComponent;