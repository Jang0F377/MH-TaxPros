import React, {Component} from "react";
import {HOMECARDS} from "../shared/homecards";
import {MHTAXPROSCARD} from "../shared/maincard";
import {SERVICES} from "../shared/services";
import MainCard from "./MainCard";
import InfoCards from "./InfoCards";
import ServiceCards from "./ServiceCards";
import CalendarComponent from "./CalendarComponent";


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homecards: HOMECARDS,
            maincard: MHTAXPROSCARD,
            services: SERVICES
        }
    };

    render() {
        return(
            <div>
                <MainCard mainCard={this.state.maincard}/>
                <InfoCards homecards={this.state.homecards}/>
                <ServiceCards services={this.state.services}/>
                <CalendarComponent/>
            </div>
        );
    }
}

export default MainPage;