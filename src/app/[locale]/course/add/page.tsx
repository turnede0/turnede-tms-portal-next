"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import Breadcrumb from "@src/components/common/Breadcrumb";
import CourseDetail from "@src/components/Course/CourseDetail";

const Add = () => {
  return (
    <PageLayout>
      <Breadcrumb
        prevPageName="Course"
        prePagePath="/course"
        pageName={"Add New Course"}
      />
      <CourseDetail />
    </PageLayout>
  );
};

export default Add;
