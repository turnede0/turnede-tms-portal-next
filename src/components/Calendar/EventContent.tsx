import { EventContentArg } from "@fullcalendar/core";
import { ScheduleCourseInfoType } from "@src/util/types";
import React from "react";

export default function EventContent(eventInfo: EventContentArg) {
  const info: ScheduleCourseInfoType = eventInfo.event
    .extendedProps as ScheduleCourseInfoType;

  return (
    <div className="inline-flex flex-col">
      <b>{eventInfo.timeText}</b>
      <i>{info.courseID}</i>
      <i>{info.courseName}</i>
      <i>{info.tutors}</i>
    </div>
  );
}
