"use client";
import React from "react";
import PageLayout from "@src/components/common/PageLayout";
import Breadcrumb from "@src/components/common/Breadcrumb";
import TutorDetail from "@src/components/Tutor/TutorDetail";

const Add = () => {
  return (
    <PageLayout>
      <Breadcrumb
        prevPageName="Tutor"
        prePagePath="/tutor"
        pageName={"Add New Tutor"}
      />
      <TutorDetail />
    </PageLayout>
  );
};

export default Add;
