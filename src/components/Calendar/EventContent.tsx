import { EventContentArg } from "@fullcalendar/core";
import React from "react";

export default function EventContent(eventInfo: EventContentArg) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
