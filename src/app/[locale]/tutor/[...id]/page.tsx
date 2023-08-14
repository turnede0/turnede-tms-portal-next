"use client";
import TutorDetail from "@src/components/Tutor/TutorDetail";
import Breadcrumb from "@src/components/common/Breadcrumb";
import PageLayout from "@src/components/common/PageLayout";
import { useTutorParticularItemQuery } from "@src/util/ApiServices";
import { useParams } from "next/navigation";

const TutorItem = () => {
  const params = useParams();
  const pageName = params.id[0];

  const { data: tutorData, isSuccess } = useTutorParticularItemQuery(pageName);

  return (
    <PageLayout>
      <Breadcrumb
        prevPageName="Tutor"
        prePagePath="/tutor"
        pageName={tutorData?.info.name ?? pageName}
      />
      {isSuccess && tutorData ? (
        <div>
          <TutorDetail tutorData={tutorData} />
        </div>
      ) : (
        <p>{pageName} TutorDetail not found</p>
      )}
    </PageLayout>
  );
};

export default TutorItem;
