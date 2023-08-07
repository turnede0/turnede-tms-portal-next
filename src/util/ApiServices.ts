import { useQuery } from "@tanstack/react-query";
import courses from "@public/mock/COURSE_DATA.json"; // DELETE: mock data
import schedule from "@public/mock/SCHEDULE_DATA.json";
import tutor from "@public/mock/TUTOR_DATA.json";
import {
  CourseType,
  ScheduleCourseInfoType,
  ScheduleType,
  TutorType,
} from "./types";
import { EventInput } from "@fullcalendar/core";
import dayjs from "dayjs";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

export const useCourseQuery = <TransformedType = CourseType[]>(select?: any) =>
  useQuery<CourseType[], Error, TransformedType>({
    queryKey: ["course"],
    queryFn: () => {
      return courses;
    },
    select,
  });

export const useCourseParticularItemQuery = (courseItemId: string) => {
  return useCourseQuery<CourseType>((data: CourseType[]) => {
    //find match search result
    console.log("alex data=", data);
    return data.find((item) => item.id === courseItemId) as CourseType;
  });
};

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
        title: `${element.courseID} - ${element.courseName}`,
        rrule:
          element.repeat !== "no repeat"
            ? {
                freq: element.repeat,
                dtstart: element.start,
                until: element.endRepeat,
              }
            : undefined,
        //@ts-ignore
        //repeat event need rrule and duration
        duration: dayjs.duration(element.duration, "minutes").format("HH:mm"),

        //single event need start and end
        start: element.start,
        end: dayjs(element.start)
          .add(element.duration ?? 0, "minutes")
          .format("YYYY-MM-DDTHH:mm"),

        extendedProps: {
          courseID: element.courseID,
          courseName: element.courseName,
          client: element.client,
          location: element.location,
          remark: element.remark,
          tutors: element.tutors,
          assistants: element.assistants,
        } as ScheduleCourseInfoType,
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
