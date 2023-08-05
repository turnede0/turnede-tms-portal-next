import { useQuery } from "@tanstack/react-query";
import courses from "@public/mock/COURSE_DATA.json"; // DELETE: mock data
import schedule from "@public/mock/SCHEDULE_DATA.json";
import tutor from "@public/mock/TUTOR_DATA.json";
import { CourseType, ScheduleType, TutorType } from "./types";
import { EventInput } from "@fullcalendar/core";
import dayjs from "dayjs";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

export const useCourseQuery = () =>
  useQuery<CourseType[], Error>({
    queryKey: ["course"],
    queryFn: () => {
      return courses;
    },
  });

export const useScheduleQuery = <TransformedType = ScheduleType[]>(
  select?: any
) => {
  return useQuery<ScheduleType[], Error, TransformedType>({
    queryKey: ["schedule"],
    queryFn: async () => {
      return schedule;
    },
    select,
  });
};

export const useScheduleEventQuery = () => {
  return useScheduleQuery<EventInput[]>((data: ScheduleType[]) => {
    let result: EventInput[] = [];
    //find match search result
    result = data.map((element) => {
      return {
        title: `${element.info.courseID} - ${element.info.courseName}`,
        rrule: element.rrule,
        //@ts-ignore
        duration: dayjs.duration(element.duration, "minutes").format("HH:mm"),
        extendedProps: element.info,
      };
    }) as EventInput[];
    //return distinct ShelfInfoType object array which is match with search shelf name
    return result;
  });
};

export const useScheduleParticularEventQuery = (eventId: string) => {
  return useScheduleQuery<ScheduleType>((data: ScheduleType[]) => {
    //find match search result
    return data.find((item) => item.id === eventId) as ScheduleType;
  });
};

export const useTutorQuery = () =>
  useQuery<TutorType[], Error>({
    //@ts-ignore
    queryKey: ["tutor"],
    queryFn: () => {
      return tutor;
    },
  });
