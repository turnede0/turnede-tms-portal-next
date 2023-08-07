"use client";
import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DateSelectArg } from "@fullcalendar/core";
import { createEventId } from "@src/util/utilFunction";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

/**
 * only accept single event
 *
 */
interface PropsType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // calendarApi: CalendarApi | undefined;
  selectInfo: DateSelectArg | undefined;
}

type inputType = {
  courseID: string;
  courseName: string;
  tutors: string[];
  startStr: string;
  endStr: string;
};

export default function EventAddModal(props: PropsType) {
  const cancelButtonRef = useRef(null);

  const { register, handleSubmit, setValue } = useForm<inputType>({
    defaultValues: {
      courseID: "",
      courseName: "",
      tutors: ["Tom"],
      startStr: "",
      endStr: "",
    },
  });

  useEffect(() => {
    //set select time in form
    setValue(
      "startStr",
      dayjs(props.selectInfo?.startStr).format("YYYY-MM-DDTHH:mm")
    );
    setValue(
      "endStr",
      dayjs(props.selectInfo?.endStr).format("YYYY-MM-DDTHH:mm")
    );
  }, [props.selectInfo]);

  const onSubmit = (data: inputType) => {
    console.log("alex new event=", data);
    console.log();
    let calendarApi = props.selectInfo?.view.calendar;
    let title = `${data.courseID} - ${data.courseName}`;

    calendarApi?.unselect(); // clear date selection

    if (data.courseName) {
      calendarApi?.addEvent({
        id: createEventId(),
        title,
        start: data.startStr,
        end: data.endStr,
        allDay: props.selectInfo?.allDay,
        extendedProps: {
          courseID: data.courseID,
          courseName: data.courseName,
          tutors: data.tutors, // TODO: temp tutor tom
        },
      });

      //TODO: call api add course
    }
  };

  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <Dialog.Title
                        as="h3"
                        className="font-medium text-black dark:text-white"
                      >
                        New Event Schedule
                      </Dialog.Title>
                    </div>
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
                        <div>
                          <label className="mb-3 block text-black dark:text-white">
                            Date start
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
                            Date end
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
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-2 sm:ml-3 sm:w-auto"
                      onClick={() => props.setIsOpen(false)}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => props.setIsOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
