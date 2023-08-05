"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import { useParams } from "next/navigation";
import Breadcrumb from "@src/components/common/Breadcrumb";
import { useScheduleParticularEventQuery } from "@src/util/ApiServices";
import ScheduleEvent from "@src/components/Schedule/ScheduleEvent";

const Event = () => {
  const params = useParams();
  const pageName = params.id[0];

  const { data: scheduleEvent, isSuccess } =
    useScheduleParticularEventQuery(pageName);
  return (
    <PageLayout>
      <Breadcrumb
        prevPageName="Schedule"
        prePagePath="/schedule"
        pageName={pageName}
      />
      {isSuccess && scheduleEvent ? (
        <div>
          <ScheduleEvent scheduleEvent={scheduleEvent} />
        </div>
      ) : (
        <p>{pageName} Schedule Event not found</p>
      )}
    </PageLayout>
  );
};

export default Event;
