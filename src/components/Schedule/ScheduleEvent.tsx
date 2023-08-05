"use client";
import React from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { ScheduleType } from "@src/util/types";

interface PropsType {
  scheduleEvent?: ScheduleType;
}

type inputType = {
  courseID: string;
  courseName: string;
  tutors: string[];
  startStr: string;
  endStr: string;
};

export default function ScheduleEvent(props: PropsType) {
  //

  const onSubmit = (data: inputType) => {
    console.log("alex new event=", data);
  };

  const { register, handleSubmit } = useForm<inputType>({
    defaultValues: {
      courseID: props.scheduleEvent?.info.courseID,
      courseName: props.scheduleEvent?.info.courseName,
      tutors: ["Tom"], //TODO:
      startStr: dayjs(props.scheduleEvent?.rrule.dtstart ?? "").format(
        "YYYY-MM-DDTHH:mm"
      ),
      endStr: dayjs(props.scheduleEvent?.rrule.dtstart ?? "")
        .add(props.scheduleEvent?.duration ?? 0, "minutes")
        .format("YYYY-MM-DDTHH:mm"),
    },
  });

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Course ID
              </label>
              <input
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register("courseID")}
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Course Name
              </label>
              <input
                type="text"
                placeholder="Active Input"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                {...register("courseName", { required: true })}
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Event start
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  // defaultValue={dayjs(
                  //   props.selectInfo?.startStr
                  // ).format("YYYY-MM-DDTHH:mm")}
                  {...register("startStr", { required: true })}
                  className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Event end
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  // defaultValue={dayjs(
                  //   props.selectInfo?.endStr
                  // ).format("YYYY-MM-DDTHH:mm")}
                  {...register("endStr", { required: true })}
                  className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-2 sm:ml-3 sm:w-auto"
          >
            Submit
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
}
