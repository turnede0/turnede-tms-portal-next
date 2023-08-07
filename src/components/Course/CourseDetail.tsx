"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { CourseType } from "@src/util/types";

interface PropsType {
  courseData?: CourseType;
}

type inputType = {
  courseID: string;
  courseName: string;
  category: string;
  difficulty: number;
  description: string;
  remark: string;
};

export default function CourseDetail(props: PropsType) {
  //

  const onSubmit = (data: inputType) => {
    console.log("alex new event=", data);
  };

  const { register, handleSubmit } = useForm<inputType>({
    defaultValues: {
      courseID: props.courseData?.courseID,
      courseName: props.courseData?.courseName,
      category: props.courseData?.category, //TODO:
      difficulty: props.courseData?.difficulty,
      description: props.courseData?.description,
      remark: props.courseData?.remark,
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Course ID
                </label>
                <input
                  type="text"
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
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register("courseName", { required: true })}
                />
              </div>
              {/* difficulty */}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Difficulty
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <select
                    {...register("difficulty")}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  {...register("category")}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {/* <!-- Textarea Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    {...register("description")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Remark
                  </label>
                  <textarea
                    rows={6}
                    {...register("remark")}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  ></textarea>
                </div>
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
