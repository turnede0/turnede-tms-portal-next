"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@src/components/common/PageLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useScheduleEventQuery } from "@src/util/ApiServices";
import { EventClickArg, DateSelectArg, EventApi } from "@fullcalendar/core";
import EventContent from "@src/components/Calendar/EventContent";
import rrulePlugin from "@fullcalendar/rrule";
import EventAddModal from "@src/components/Calendar/EventAddModal";
import Breadcrumb from "@src/components/common/Breadcrumb";
import { useTranslations } from "next-intl";

const Calendar = () => {
  const t = useTranslations("Calendar");

  const { data: eventsData, isSuccess } = useScheduleEventQuery();
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  //modal
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg>();

  useEffect(() => {
    console.log("alex currentEvents=", currentEvents);
  }, [currentEvents]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event  '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    selectInfo.view.calendar.unselect();
    setSelectInfo(selectInfo);
    setAddModalIsOpen(true);
  };

  return (
    <>
      <PageLayout>
        <div>
          <Breadcrumb pageName={t("title")} />
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
              events={eventsData}
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
        selectInfo={selectInfo}
      />
    </>
  );
};

export default Calendar;
