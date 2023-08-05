"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import { useScheduleQuery } from "@src/util/ApiServices";
import Breadcrumb from "@src/components/common/Breadcrumb";
import BasicTable from "@src/components/BasicTable";
import CoverOne from "@public/image/cover/cover-01.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Schedule = () => {
  const { data, isSuccess } = useScheduleQuery();
  const router = useRouter();

  const scheduleColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Course ID",
      accessorKey: "info.courseID",
    },
    {
      header: "Course Name",
      accessorKey: "info.courseName",
    },
    {
      header: "Start",
      accessorKey: "rrule.dtstart",
    },
    {
      header: "Duration",
      accessorKey: "duration",
    },
    {
      header: "Client",
      accessorKey: "info.client",
    },
    {
      header: "tutors",
      accessorKey: "info.tutors",
    },
    {
      header: "assistants",
      accessorKey: "info.assistants",
    },
    {
      header: "Location",
      accessorKey: "info.location",
    },
    {
      header: "Repeat",
      accessorKey: "rrule.freq",
    },
    {
      header: "Remark",
      accessorKey: "info.remark",
    },
  ];

  return (
    <PageLayout>
      <Breadcrumb pageName="Schedule" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        {isSuccess && (
          <BasicTable
            handleAdd={() => {
              router.push("schedule/add");
            }}
            data={data}
            columns={scheduleColumns}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Schedule;
