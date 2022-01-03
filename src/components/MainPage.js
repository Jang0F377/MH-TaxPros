import React, {Component} from "react";
import {HOMECARDS} from "../shared/homecards";
import {MHTAXPROSCARD} from "../shared/maincard";
import {SERVICES} from "../shared/services";
import MainCard from "./MainCard";
import InfoCards from "./InfoCards";
import ServiceCards from "./ServiceCards";
import CalendarComponent from "./CalendarComponent";
import LatestNewsComponent from "./LatestNewsComponent";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homecards: HOMECARDS,
            maincard: MHTAXPROSCARD,
            services: SERVICES,
        }
    };

    render() {
        return(
            <div>
                <NavbarComponent/>
                <MainCard mainCard={this.state.maincard}/>
                <LatestNewsComponent/>
                <InfoCards homecards={this.state.homecards}/>
                <CalendarComponent/>
                <FooterComponent/>
            </div>
        );
    }
}

export default MainPage;