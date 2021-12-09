import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import {Button} from "@mui/material";
import {BookAppointmentModal} from "./ModalComponents";



const getApptProxy = "https://obscure-shelf-17700.herokuapp.com/"
const baseURL = 'https://gcmtaxpros.fullslate.com/api/v2/'
export const API_KEY = "OnXUb9Y3WEfVqLpHhvtITVVWGVj8AvkoJ4MlEOXM853vDvAP4g";

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
export const bookAppointmentEndpoint = `${getApptProxy}${baseURL}appointments?user_type=${userTypeArray[0]}`;
const servicesEndpoint = `${baseURL}services`;
const openingsEndpoint =  `${baseURL}openings?services=${serviceArr.inPerson}${employees.michael}&user_type=${userTypeArray[0]}&${fromDate}&${toDate}`;
const employeeEndpoint = `${baseURL}employees`;
const appointmentEndpoint = `${baseURL}appointments?${fromDate}&${toDate}`;


// Headers
const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);
    myHeaders.append("Content-Type","application/json");
    myHeaders.append("Accept", "application/json");


//GET Req Options
const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: 'follow'
};
// const getOpenings = () => {
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
//             console.log(result);
//         })
//         .catch(err => console.error(err));
// };
// const getAppointments = () => {
//     fetch(getApptProxy+appointmentEndpoint,requestOptions)
//         .then(response => {
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 return response.error.toString;
//             }
//         })
//         .then(data => {
//             const len = data.length;
//             console.log(data);
//             for (let i=0;i<len;i++) {
//                 console.log(`#${i}: ${data[i].at}`);
//             }
//         })
//         .catch(err => console.error(err))
// }
//
// getOpenings();
// getAppointments();

// Begin FunctionComponent Code//
function CalendarComponent() {
    const [showModal,setShowModal] = useState(false);
    const [dateString,setDateString] = useState('');
    const reload = () => window.location.reload();
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        reload();
    };



    const [openAppt,setOpenAppt] = useState({});
    const eventsTest = {events: [],backgroundColor:'gold',textColor:'black'};
    const returnEvents = (arr) => {
        let dataLen = arr.length;
        const endTime = (time) => {


        }
        for (let i=0;i<dataLen;i++) {
            eventsTest.events.push({
                title: 'InPerson Appt',
                start: `${arr[i]}`,
                end: ''
            })
            //Time returns this: 2022-11-01T09:30:00-07:00
        }
    };

    useEffect(() => {
        fetch(getApptProxy+openingsEndpoint,requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response
            })
            .then(res => {
                let openings = res.openings;
                setOpenAppt(openings);
            })
            .catch(err => {
                console.error("Error fetching data: ", err);
                throw err;
            })
    }, []);
    returnEvents(openAppt);

    return (
        <div style={{background:'#f7f7f7',padding:'2px',margin:'2px'}} id='apptCalendar'>
            <BookAppointmentModal isOpen={showModal} chosenDate={dateString} toggle={handleCloseModal} close={handleCloseModal} fsAPI={bookAppointmentEndpoint} />
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialDate='2022-11-01'
                timeZone='local'
                initialView='dayGridMonth'
                events={eventsTest}
                headerToolbar={{
                    start: '',
                    center: 'title',
                    end: 'today prev,next'
                }}
                eventClick={function (info) {
                    let start = info.event.startStr;
                    setDateString(start);
                    handleShowModal();
                }}
            />
        </div>
    );
}

export default CalendarComponent;



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