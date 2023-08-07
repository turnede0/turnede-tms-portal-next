"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import Breadcrumb from "@src/components/common/Breadcrumb";
import BasicTable from "@src/components/BasicTable";
import { useCourseQuery } from "@src/util/ApiServices";
import { useRouter } from "next/navigation";
import CoverOne from "@public/image/cover/cover-01.png";
import Image from "next/image";

const Course = () => {
  const { data, isSuccess } = useCourseQuery();
  const router = useRouter();

  const scheduleColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Course ID",
      accessorKey: "courseID",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "courseName",
      accessorKey: "courseName",
    },
    {
      header: "Difficulty",
      accessorKey: "difficulty",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Remark",
      accessorKey: "remark",
    },
  ];

  return (
    <PageLayout>
      <Breadcrumb pageName="Course" />
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
              router.push("course/add");
            }}
            data={data}
            columns={scheduleColumns}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Course;
