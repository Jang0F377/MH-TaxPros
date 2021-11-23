import React, {Component} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';


const getApptProxy = "https://obscure-shelf-17700.herokuapp.com/"
const baseURL = 'https://gcmtaxpros.fullslate.com/api/v2/'
const API_KEY = "OnXUb9Y3WEfVqLpHhvtITVVWGVj8AvkoJ4MlEOXM853vDvAP4g";

const serviceArr = {
    inPerson: 1

};
let userTypeArray = ["BUSINESS_USER","CLIENT"];
let employees = {
    brad: '&employees=2',
    michael: '&employees=4351'
};
let fromDate = 'from=2021-11-17';
let toDate = 'to=2021-11-30';

//Endpoints
const servicesEndpoint = `${baseURL}services`;
const openingsEndpoint =  `${baseURL}openings?services=${serviceArr.inPerson}${employees.brad}&user_type=${userTypeArray[0]}&${fromDate}&${toDate}`;
const employeeEndpoint = `${baseURL}employees`

// Headers
const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);
    myHeaders.append("Content-Type","application/json");
    myHeaders.append("Accept", "application/json");

// Req Options
const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: 'follow'
};



// Begin Code//

class CalendarComponent extends Component {



    render() {
        // getOpenings();
        return(
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                events={testEvents}
            />
        );
    }
}

export default CalendarComponent;

const testEvents = {
    events: [
        {
            title: 'event1',
            start: '2021-11-11T12:30:00'
        },
        {
            title: 'Inperson Appt',
            start: '2021-11-21T12:30:00'
        },
        {
            title: 'Business Return',
            start: '2021-11-27T10:30:00',
            end: '2021-11-27T12:30:00'
        }
    ]
}





const eventData = (openings) => {
    const len = openings.length;
    for (let i = 0; i < len; i++) {
        console.log(openings[i]);
    }

}


function getOpenings() {
    fetch(getApptProxy+openingsEndpoint,requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(response)
                    .then(r => {
                        console.log(r);
                    })
            }
        })
        .then(result => {
            //Result Code HERE
            let openAppts = result.openings;
            eventData(openAppts);

        })
        .catch(err => console.error(err));
}




// NO LONGER NEEDED FUNCTIONS USED FOR TESTING
function getEmployees() {
    fetch(getApptProxy+employeeEndpoint,requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(response)
                    .then(err => {
                        console.log(err);
                    })
            }
        })
        .then(result => {
            let employeeLen = result.length;
            console.log(employeeLen);
            console.log(result);
        })
}
function getServices() {
    fetch(getApptProxy+servicesEndpoint,requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(response);
                console.log(response);
            }
        })
        .then(result => {
            let resLen = result.length;
            console.log(resLen);
            console.log(result);
        })
        .catch(err => console.log(err));
}