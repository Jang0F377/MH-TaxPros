import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Divider } from "@mui/material";
import { BookAppointmentModal } from "./ModalComponents";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { CONSTANTS } from "../constants";

const getApptProxy = "https://stark-scrubland-64104.herokuapp.com/";
const baseURL = "https://gcmtaxpros.fullslate.com/api/v2/";
const testURL = "https://mhtaxpro.com/api/openings";
const serviceArr = {
  inPerson: 1,
};
let userTypeArray = ["BUSINESS_USER", "CLIENT"];
let employees = {
  brad: "&employees=2",
  michael: "&employees=4351",
};
let fromDate = "from=2023-01-01";
let toDate = "to=2023-03-01";
let fromDate2 = "from=2023-03-02";
let toDate2 = "to=2023-04-18";

//Endpoints
export const bookAppointmentEndpoint = `${getApptProxy}${baseURL}appointments?user_type=${userTypeArray[1]}`;
const openingsEndpoint = `${baseURL}?services=${serviceArr.inPerson}${employees.michael}&user_type=${userTypeArray[0]}&${fromDate}&${toDate}`;
const openingsEndpoint2 = `${baseURL}?services=${serviceArr.inPerson}${employees.michael}&user_type=${userTypeArray[0]}&${fromDate2}&${toDate2}`;
console.log(openingsEndpoint);
console.log(openingsEndpoint2);
// Headers
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CONSTANTS.API_KEY}`);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

//GET Req Options
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// Begin FunctionComponent Code//
function CalendarComponent() {
  const [showModal, setShowModal] = useState(false);
  const [dateString, setDateString] = useState("");
  const reload = () => window.location.reload();
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    reload();
  };

  const [openAppt, setOpenAppt] = useState({});
  const [openAppt2, setOpenAppt2] = useState({});
  const eventsTest = { events: [], backgroundColor: "gold" };
  const returnEvents = (arr) => {
    let dataLen = arr.length;
    for (let i = 0; i < dataLen; i++) {
      eventsTest.events.push({
        title: "InPerson Appt",
        start: `${arr[i]}`,
        end: "",
      });
      //Time returns this: 2022-11-01T09:30:00-07:00
    }
  };

  function getOpeningsFlow() {
    fetch(getApptProxy + openingsEndpoint, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((res) => {
        let openings = res.openings;
        setOpenAppt(openings);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        throw err;
      });
  }
  function getOpeningsFlow2() {
    fetch(getApptProxy + openingsEndpoint2, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((res) => {
        let openings = res.openings;
        setOpenAppt2(openings);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        throw err;
      });
  }

  useEffect(() => {
    getOpeningsFlow();
    getOpeningsFlow2();
  }, []);
  returnEvents(openAppt);
  returnEvents(openAppt2);

  return (
    <div>
      <Container className="text-center top__cal__cont">
        <Row>
          <Col xs={12} sm>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              size={"4x"}
              className="mt-3 mb-2"
            />
          </Col>
          <Col xs={12} sm>
            <div className="title__h1">Attention</div>
          </Col>
          <Col xs={12} sm>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              size={"4x"}
              className="mt-3 mb-2"
            />
          </Col>
        </Row>
        <Divider />
        <div className="lower__h1">
          Calendar appointments are only necessary for{" "}
          <strong>In-Person</strong> appointments. If you are sending in your
          info you do not need a calendar appointment.
        </div>
      </Container>
      <div
        style={{ background: "#f7f7f7", padding: "2px", margin: "2px" }}
        id="apptCalendar"
      >
        <BookAppointmentModal
          isOpen={showModal}
          chosenDate={dateString}
          toggle={handleCloseModal}
          fsAPI={bookAppointmentEndpoint}
        />
        <FullCalendar
          plugins={[dayGridPlugin]}
          timeZone="local"
          initialView="dayGridMonth"
          events={eventsTest}
          headerToolbar={{
            start: "",
            center: "title",
            end: "today prev,next",
          }}
          eventClick={function (info) {
            let start = info.event.startStr;
            setDateString(start);
            handleShowModal();
          }}
        />
      </div>
    </div>
  );
}

export default CalendarComponent;
