"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useScheduleEventQuery } from "@src/util/ApiServices";
import { EventSourceInput } from "@fullcalendar/core";

const Calendar = () => {
  const { data: events, isSuccess } = useScheduleEventQuery();
  return (
    <PageLayout>
      {" "}
      <div>
        <h1>Calendar</h1>
        {isSuccess && (
          <FullCalendar
            editable
            selectable
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            plugins={[
              dayGridPlugin,
              // rrulePlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
            initialView="timeGridWeek"
            events={events as EventSourceInput}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Calendar;
