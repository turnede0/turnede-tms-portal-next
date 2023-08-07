"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import { useParams } from "next/navigation";
import Breadcrumb from "@src/components/common/Breadcrumb";
import { useCourseParticularItemQuery } from "@src/util/ApiServices";
import CourseDetail from "@src/components/Course/CourseDetail";

const CourseItem = () => {
  const params = useParams();
  const pageName = params.id[0];

  const { data: courseData, isSuccess } =
    useCourseParticularItemQuery(pageName);
  return (
    <PageLayout>
      <Breadcrumb
        prevPageName="Course"
        prePagePath="/course"
        pageName={pageName}
      />
      {isSuccess && courseData ? (
        <div>
          <CourseDetail courseData={courseData} />
        </div>
      ) : (
        <p>{pageName} CourseDetail not found</p>
      )}
    </PageLayout>
  );
};

export default CourseItem;
