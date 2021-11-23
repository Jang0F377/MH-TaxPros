import './App.css';
import React, {useState, useEffect, Component} from "react";
import {Col, Container} from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import {Route,Switch} from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import HomeCards from "./components/HomeComponent";
import {HOMECARDS} from "./shared/homecards";
import {MHTAXPROSCARD} from "./shared/maincard";
import MainCard from "./components/MainCard";
import InfoCards from "./components/InfoCards";
import ServiceCards from "./components/ServiceCards";
import {SERVICES} from "./shared/services";
import CalendarComponent from "./components/CalendarComponent";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homecards: HOMECARDS,
            maincard: MHTAXPROSCARD,
            services: SERVICES
        }
    };



    render() {
        return (
            <div style={{background: "RGBA(0,59,0,0.47)"}}>
                <NavbarComponent/>
                <MainCard mainCard={this.state.maincard}/>
                <InfoCards homecards={this.state.homecards}/>
                <ServiceCards services={this.state.services}/>
                <CalendarComponent/>
            </div>
        );
    }

}
export default App;
