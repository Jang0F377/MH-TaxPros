import {Col, Container, Row} from "react-bootstrap";
import {Divider} from "@mui/material";
import {TAXDATES} from "../shared/importantDates";


function LatestNewsComponent() {

    return(
        <div style={{display: 'auto',marginBottom:'20px'}}>
            <Container style={{background:'#fff',borderRadius:'10px',padding:'8px'}}>
                <Row>
                    <div style={{textAlign:'left',textDecoration:'underline',color:'#0000dd', fontSize:'1.5rem',margin:'4px'}}>
                        Tax Dates to Remember
                    </div>
                </Row>
                <Divider/>
                {TAXDATES.map(item => {
                    return(
                        <Row key={item.id} style={{marginTop:'10px'}}>
                            <Col xs={1} md={2} style={{padding:'2px',margin:'4px 0px 0px 8px',textAlign:'left', borderRight:'1px solid black',borderBottom:'1px solid black'}}>
                                {item.date}
                            </Col>
                            <Col style={{margin: '2px 0px 0px 4px', textAlign:'left', padding:'2px',borderBottom:'1px solid black'}}>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                            </Col>
                        </Row>
                    );
                })}
            </Container>
        </div>
    );
}

export default LatestNewsComponent;