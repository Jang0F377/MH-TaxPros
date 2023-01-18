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

const URL = "http://localhost:3030/1 "; //first-openings";
const URL2 = "http://localhost:3030/2"; //more-openings";
const BOOK_URL = "http://localhost:3030/book-appointments";

//Endpoints
export const bookAppointmentEndpoint = BOOK_URL;
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
    fetch(URL, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((res) => {
        console.log(res);
        let openings = res.openings;
        setOpenAppt(openings);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        throw err;
      });
  }
  function getOpeningsFlow2() {
    fetch(URL2, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((res) => {
        console.log(res);
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
