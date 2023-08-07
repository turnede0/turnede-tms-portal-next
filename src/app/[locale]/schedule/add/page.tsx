"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import Breadcrumb from "@src/components/common/Breadcrumb";
import ScheduleEvent from "@src/components/Calendar/ScheduleEvent";

const Add = () => {
  return (
    <PageLayout>
      <Breadcrumb
        prevPageName="Schedule"
        prePagePath="/schedule"
        pageName={"Add New Event"}
      />
      <ScheduleEvent />
    </PageLayout>
  );
};

export default Add;
