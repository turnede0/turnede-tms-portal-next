"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@src/components/common/PageLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useScheduleEventQuery } from "@src/util/ApiServices";
import {
  EventSourceInput,
  EventClickArg,
  DateSelectArg,
  EventApi,
  CalendarApi,
} from "@fullcalendar/core";
import EventContent from "@src/components/Calendar/EventContent";
import { createEventId } from "@src/util/utilFunction";
import rrulePlugin from "@fullcalendar/rrule";
import EventAddModal from "@src/components/Calendar/EventAddModal";
import Breadcrumb from "@src/components/common/Breadcrumb";

const Calendar = () => {
  const { data: eventsData, isSuccess } = useScheduleEventQuery();
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  //modal
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [calendarApi, setCalendarApi] = useState<CalendarApi>();

  useEffect(() => {
    console.log("alex currentEvents=", currentEvents);
  }, [currentEvents]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // let title = prompt("Please enter a new title for your event");
    selectInfo.view.calendar.unselect();
    setCalendarApi(selectInfo.view.calendar);
    setAddModalIsOpen(true);
    // let calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //     extendedProps: {
    //       tutors: ["tom"],
    //     },
    //   });
    // }
  };

  return (
    <>
      <PageLayout>
        <div>
          <Breadcrumb pageName="Calendar" />
          {isSuccess && (
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                rrulePlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
              eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            />
          )}
        </div>
      </PageLayout>
      <EventAddModal
        isOpen={addModalIsOpen}
        setIsOpen={setAddModalIsOpen}
        calendarApi={calendarApi}
      />
    </>
  );
};

export default Calendar;
