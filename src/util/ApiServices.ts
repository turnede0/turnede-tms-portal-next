import { useQuery } from "@tanstack/react-query";
import courses from "@public/mock/COURSE_DATA.json"; // DELETE: mock data
import schedule from "@public/mock/SCHEDULE_DATA.json";
import tutor from "@public/mock/TUTOR_DATA.json";
import {
  CourseType,
  ScheduleEventType,
  ScheduleType,
  TutorType,
} from "./types";

export const useCourseQuery = () =>
  useQuery<CourseType[], Error>({
    queryKey: ["course"],
    queryFn: () => {
      return courses;
    },
  });

export const useScheduleQuery = <TransformedType>(
  // eslint-disable-next-line no-unused-vars
  select?: (data: any) => TransformedType | undefined
) =>
  useQuery<ScheduleType[], Error>({
    queryKey: ["schedule"],
    queryFn: () => {
      return schedule;
    },
    select,
  });

export const useScheduleEventQuery = () => {
  return useScheduleQuery((data: ScheduleType[]) => {
    let result: ScheduleEventType[] = [];
    //find match search result
    result = data.map((element) => {
      return {
        title: `${element.courseID} - ${element.courseName}`,
        rrule: {
          freq: element.repeat,
          dtstart: element.start,
          until: element.endRepeat,
        },
      };
    }) as ScheduleEventType[];
    //return distinct ShelfInfoType object array which is match with search shelf name
    return result;
  });
};

// export const useTutorQuery = () =>
//   useQuery<TutorType[], Error>({
//     queryKey: ["tutor"],
//     queryFn: () => {
//       return tutor;
//     },
//   });
