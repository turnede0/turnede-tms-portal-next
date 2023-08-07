import { ScheduleType } from "@src/util/types";
import React from "react";

//TODO: no use temp
export default function SidebarEvent(event: ScheduleType) {
  return (
    <li key={event.id}>
      <b>{event.start}</b>
    </li>
  );
}
