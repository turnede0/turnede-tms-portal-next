export type CourseType = {
  id: number;
  courseID: string;
  category: string;
  courseName: string;
  difficulty: number;
  description: string;
  remark: string;
};

export type ScheduleType = {
  id: number;
  courseID: string;
  courseName: string;
  start: string;
  end: string;
  client: string;
  location: string;
  repeat: string; //'does not repeat' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  endRepeat: string;
  remark: string;
};

export type ScheduleEventType = {
  title: string;
  rrule: { freq: string; dtstart: string; until: string };
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
