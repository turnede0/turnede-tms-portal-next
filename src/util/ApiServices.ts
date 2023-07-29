import { useQuery } from "@tanstack/react-query";
import courses from "@public/mock/COURSE_DATA.json"; // DELETE: mock data
import schedule from "@public/mock/SCHEDULE_DATA.json";
import tutor from "@public/mock/TUTOR_DATA.json";
import { CourseType, ScheduleType, TutorType } from "./types";
import { EventSourceInput } from "@fullcalendar/core";

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
    let result: EventSourceInput[] = [];
    //find match search result
    result = data.map((element) => {
      return {
        title: `${element.courseID} - ${element.courseName}`,
        start: element.start,
        end: element.end,
        daysOfWeek: element.daysOfWeek,
        startTime: element.startTime,
        endTime: element.endTime,
      };
    }) as EventSourceInput[];
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
