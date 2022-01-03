import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import {Container} from "react-bootstrap";


function AboutComponent() {
    return(
        <div>
            <NavbarComponent/>
            <Container>
                About Component
            </Container>
            <FooterComponent/>
        </div>
    );
}

export default AboutComponent;