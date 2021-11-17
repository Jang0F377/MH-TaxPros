import {Component} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'


class CalendarComponent extends Component {







    render() {
        return(
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    dateClick={this.handleDateClick}
                />
            </div>
        );
    }

    handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

}


export default CalendarComponent;
