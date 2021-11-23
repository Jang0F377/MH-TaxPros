import React, {Component, useEffect, useState} from "react";
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
let fromDate = 'from=2022-11-01';
let toDate = 'to=2022-11-15';

//Endpoints
const servicesEndpoint = `${baseURL}services`;
const openingsEndpoint =  `${baseURL}openings?services=${serviceArr.inPerson}${employees.michael}&user_type=${userTypeArray[0]}&${fromDate}&${toDate}`;
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
// function getOpenings() {
//     fetch(getApptProxy+openingsEndpoint,requestOptions)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 Promise.reject(response)
//                     .then(r => {
//                         console.log(r);
//                     })
//             }
//         })
//         .then(result => {
//             //Result Code HERE
//             let openAppts = result.openings;
//             eventData(openAppts);
//
//         })
//         .catch(err => console.error(err));
// }




// Begin Code//

function CalendarComponent() {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        fetch(getApptProxy+openingsEndpoint,requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response
            })
            .then(data => {
                console.log(data)
                setData(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [])

    if (loading) return "Loading!!!!";
    if (error) return  "ERROR!!!!";


    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialDate='2022-11-01'
                initialView='dayGridMonth'
                events={testEvents}
            />
            {console.log(data.openings)}
        </>

    );





}

export default CalendarComponent;

const testEvents = {
    events: [
        {
            title: 'event1',
            start: '2022-11-11T12:30:00'
        },
        {
            title: 'Inperson Appt',
            start: '2022-11-21T12:30:00'
        },
        {
            title: 'Business Return',
            start: '2022-11-27T10:30:00',
            end: '2022-11-27T12:30:00'
        }
    ]
}





const eventData = (openings) => {
    const len = openings.length;
    for (let i = 0; i < len; i++) {
        console.log(openings[i]);
    }

}






// NO LONGER NEEDED FUNCTIONS USED FOR TESTING
// function getEmployees() {
//     fetch(getApptProxy+employeeEndpoint,requestOptions)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 Promise.reject(response)
//                     .then(err => {
//                         console.log(err);
//                     })
//             }
//         })
//         .then(result => {
//             let employeeLen = result.length;
//             console.log(employeeLen);
//             console.log(result);
//         })
// }
// function getServices() {
//     fetch(getApptProxy+servicesEndpoint,requestOptions)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 Promise.reject(response);
//                 console.log(response);
//             }
//         })
//         .then(result => {
//             let resLen = result.length;
//             console.log(resLen);
//             console.log(result);
//         })
//         .catch(err => console.log(err));
// }