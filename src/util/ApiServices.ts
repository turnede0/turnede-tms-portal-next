import { useQuery } from "@tanstack/react-query";
import courses from "@public/mock/COURSE_DATA.json"; // DELETE: mock data
import schedule from "@public/mock/SCHEDULE_DATA.json";
import tutor from "@public/mock/TUTOR_DATA.json";
import { CourseType, ScheduleType, TutorType } from "./types";
import { EventInput } from "@fullcalendar/core";

export const useCourseQuery = () =>
  useQuery<CourseType[], Error>({
    queryKey: ["course"],
    queryFn: () => {
      return courses;
    },
  });

export const useScheduleQuery = (select?: any) => {
  return useQuery<ScheduleType[], Error>({
    queryKey: ["schedule"],
    queryFn: async () => {
      return schedule;
    },
    select,
  });
};

export const useScheduleEventQuery = () => {
  return useScheduleQuery((data: ScheduleType[]) => {
    let result: EventInput[] = [];
    //find match search result
    result = data.map((element) => {
      return {
        title: `${element.info.courseID} - ${element.info.courseName}`,
        rrule: element.rrule,
        duration: element.duration,
        extendedProps: element.info,
      };
    }) as EventInput[];
    //return distinct ShelfInfoType object array which is match with search shelf name
    return result;
  });
};

export const useTutorQuery = () =>
  useQuery<TutorType[], Error>({
    queryKey: ["tutor"],
    queryFn: () => {
      return tutor;
    },
  });
