import './App.css';
import React, { Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import MainPage from "./components/MainPage";
import AboutComponent from "./components/AboutComponent";
import ContactComponent from "./components/ContactComponent";



class App extends Component {



    render() {
        return (
            <div style={{background: "RGBA(20,20,20,0.60)"}}>
                <Switch>
                    <Route exact path='/home' component={MainPage}/>
                    <Route path='/about' component={AboutComponent}/>
                    <Route path='/contact' component={ContactComponent}/>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        );
    }

}
export default App;
