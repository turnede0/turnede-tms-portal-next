"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import { useTutorQuery } from "@src/util/ApiServices";
import { useRouter } from "next/navigation";
import Breadcrumb from "@src/components/common/Breadcrumb";
import Image from "next/image";
import CoverOne from "@public/image/cover/cover-01.png";
import BasicTable from "@src/components/BasicTable";

const Tutor = () => {
  const { data, isSuccess } = useTutorQuery();
  const router = useRouter();

  const scheduleColumns = [
    { headers: "ID", accessorKey: "id" },
    { headers: "Name", accessorKey: "info.name" },
    { headers: "Whatsapp", accessorKey: "info.whatsapp" },
    { headers: "Employee Status", accessorKey: "employee_status" },
    { headers: "Status", accessorKey: "status" },
    { headers: "Jobs", accessorKey: "jobs" },
    { headers: "Work Hour", accessorKey: "work_hour" },
    { headers: "Preference", accessorKey: "preference" },
    { headers: "Tag", accessorKey: "tag" },
  ];
  return (
    <PageLayout>
      <Breadcrumb pageName="Tutor" />
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
              router.push("tutor/add");
            }}
            data={data}
            columns={scheduleColumns}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Tutor;
