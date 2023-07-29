"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@src/components/common/PageLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useScheduleEventQuery } from "@src/util/ApiServices";
import {
  EventSourceInput,
  EventClickArg,
  DateSelectArg,
} from "@fullcalendar/core";
import EventContent from "@src/components/Calendar/EventContent";
import { createEventId } from "@src/util/utilFunction";
import rrulePlugin from "@fullcalendar/rrule";

const Calendar = () => {
  const { data: eventsData, isSuccess } = useScheduleEventQuery();
  // const [currentEvents, setCurrentEvents] = useState<EventSourceInput>("");

  useEffect(() => {
    console.log("alex eventData=", eventsData);
  }, [eventsData]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  // const handleEvents = (events: EventSourceInput) => {
  //   setCurrentEvents(events);
  // };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <PageLayout>
      {" "}
      <div>
        <h1>Calendar</h1>
        {isSuccess && (
          <FullCalendar
            plugins={[
              dayGridPlugin,
              // rrulePlugin,
              timeGridPlugin,
              interactionPlugin,
              rrulePlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends={true}
            initialView="timeGridWeek"
            events={eventsData as EventSourceInput}
            select={handleDateSelect}
            eventContent={EventContent} // custom render function
            eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Calendar;
