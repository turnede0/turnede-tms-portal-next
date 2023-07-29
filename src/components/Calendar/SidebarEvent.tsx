import { ScheduleType } from "@src/util/types";
import React from "react";

export default function SidebarEvent(event: ScheduleType) {
  return (
    <li key={event.id}>
      <b>{event.start}</b>
      <i>{event.courseName}</i>
    </li>
  );
}
