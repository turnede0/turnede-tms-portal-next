export type CourseType = {
  id: string;
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
  id: string;
  courseID: string;
  courseName: string;
  start: string;
  duration: number;
  client: string;
  location: string;
  tutors: string[];
  assistants: string[];
  // repeat: 'no repeat' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  repeat: string;
  endRepeat: string;
  remark: string;
};

//Tutor start
export type qualificationType = {
  period: string;
  name: string;
};
export type TutorType = {
  id: string;
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
