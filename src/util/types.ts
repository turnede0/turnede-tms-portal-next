import { Frequency, WeekdayStr } from "rrule";
export type CourseType = {
  id: number;
  courseID: string;
  category: string;
  courseName: string;
  difficulty: number;
  description: string;
  remark: string;
};

export type ScheduleCourseInfoType = {
  courseID: string;
  courseName: string;
  client: string;
  location: string;
  remark: string;
  tutors: string[];
  assistants: string[];
};

export type ScheduleType = {
  id: number;
  info: ScheduleCourseInfoType;
  //fullcalendar
  rrule: {
    freq: string; //'does not repeat' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    dtstart: string; //"2023-07-15T13:30:15.000+0800",
    until: string; //"2023-08-07T15:30:15.000+0800"
  };
  duration: string; //"02:30"   2hr30mins
};

//Tutor start
export type qualificationType = {
  period: string;
  name: string;
};
export type TutorType = {
  id: number;
  info: {
    name: string;
    identity: string;
    phone1: string;
    phone2: string;
    whatsapp: string;
    email: string;
    address: string;
    qualification: qualificationType[];
  };
  bankAccount: {
    bankName: string;
    bankaccountNo: string;
  };
  employee_status: string; //"full-time" | "part-time" | "internship";
  status: string; //"active" | "inactive";
  jobs: number;
  work_hour: number;
  description: string;
  remark: string;
  preference: string[];
  tag: string[];
};
//Tutor end
