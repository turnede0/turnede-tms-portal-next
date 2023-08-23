"use client";
import { TutorType, qualificationType } from "@src/util/types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MultSelectCombox from "../common/Multiselect/MultSelectCombox";

interface PropsType {
  tutorData?: TutorType;
}

type inputType = {
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
  employee_status: string;
  status: string;
  jobs: number;
  work_hour: number;
  description: string;
  remark: string;
  preference: string[];
  tag: string[];
};

export default function TutorDetail(props: PropsType) {
  //

  const onSubmit = (data: inputType) => {
    console.log("alex new event=", data);
  };

  const { register, handleSubmit, control } = useForm<inputType>({
    defaultValues: {
      info: props.tutorData?.info,
      bankAccount: props.tutorData?.bankAccount,
      employee_status: props.tutorData?.employee_status,
      status: props.tutorData?.status,
      jobs: props.tutorData?.jobs,
      work_hour: props.tutorData?.work_hour,
      description: props.tutorData?.description,
      remark: props.tutorData?.remark,
      preference: props.tutorData?.preference,
      tag: props.tutorData?.tag,
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* <!-- Info Field --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-5.5 p-6.5">
                {/* Name */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("info.name")}
                  />
                </div>
                {/* Identity Card No. */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Identity Card No.
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("info.identity")}
                  />
                </div>
                {/* Phone No. 1 */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Phone No. 1
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("info.phone1")}
                  />
                </div>
                {/* Phone No. 2 */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Phone No. 2
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("info.phone2")}
                  />
                </div>
                {/* Whatsapp */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Whatsapp
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("info.whatsapp")}
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("info.email")}
                  />
                </div>
                {/* Address */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Address
                  </label>
                  <textarea
                    rows={6}
                    {...register("info.address")}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>
                {/* Qualification */}
                <div className="flex flex-col gap-2">
                  <label className="mb-3 block text-black dark:text-white">
                    Qualification
                  </label>
                  <Controller
                    name="info.qualification"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <div>
                        {(value as qualificationType[])?.length > 0 && (
                          <div>
                            {(value as qualificationType[]).map(
                              (qualification, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex flex-col gap-5"
                                  >
                                    <div className="flex flex-col bg-slate-50 dark:bg-slate-800 rounded-lg my-1 p-3 gap-2">
                                      {/* Degree */}
                                      <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                          Degree
                                        </label>
                                        <input
                                          type="text"
                                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                          {...register(
                                            //@ts-ignore
                                            `info.qualification[${index}].name`
                                          )}
                                        />
                                      </div>
                                      {/* Period */}
                                      <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                          Period
                                        </label>
                                        <div className="flex flex-row items-center justify-center gap-5">
                                          <input
                                            type="month"
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            {...register(
                                              //@ts-ignore
                                              `info.qualification[${index}].periodFrom`
                                            )}
                                          />
                                          <span className="text-xl font-bold">
                                            -
                                          </span>
                                          <input
                                            type="month"
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            {...register(
                                              //@ts-ignore
                                              `info.qualification[${index}].periodTo`
                                            )}
                                          />
                                        </div>
                                      </div>
                                      {/* Delete Button */}
                                      <div className="flex flex-row justify-end">
                                        <button
                                          type="button"
                                          className="mt-3 inline-flex w-auto justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                          //delete item from array
                                          onClick={() => {
                                            onChange(
                                              (e: qualificationType[]) => {
                                                let temp = e.filter(
                                                  function (item) {
                                                    return (
                                                      item !== qualification
                                                    );
                                                  }
                                                );
                                                console.log("temp=", temp);
                                                return temp;
                                              }
                                            );
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-2"
                          //add new empty item from array
                          onClick={() =>
                            onChange((e: qualificationType[]) => {
                              return [
                                ...e,
                                { period: "", name: "" } as qualificationType,
                              ];
                            })
                          }
                        >
                          Add
                        </button>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {/* <!-- Bank Field --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="flex flex-col gap-5.5 p-6.5">
                    {/* bank name */}
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        {...register("bankAccount.bankName")}
                      />
                    </div>
                    {/* email */}
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Bank Account No.
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        {...register("bankAccount.bankaccountNo")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Others Field --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-5.5 p-6.5">
                {/* Employee Status */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Employee Status
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      {...register("employee_status")}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option value={"part-time"}>part time</option>
                      <option value={"full-time"}>full time</option>
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
                {/* Status */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Active Status
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      {...register("status")}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option value={"active"}>active</option>
                      <option value={"inactive"}>inactive</option>
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
                {/* Jobs */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    No. of Jobs
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("jobs")}
                  />
                </div>
                {/* Working hours */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Working hour(s)
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("work_hour")}
                  />
                </div>
                {/* Description */}
                <div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      {...register("description")}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
                {/* Remark */}
                <div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Remark
                    </label>
                    <textarea
                      rows={6}
                      {...register("remark")}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
                {/* Preference */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Preference
                  </label>
                  <MultSelectCombox
                    formStateValue="preference"
                    option={["biology", "physics", "math", "chemistry"]}
                    control={control}
                  />
                </div>
                {/* Tag */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Tag
                  </label>
                  <MultSelectCombox
                    formStateValue="tag"
                    option={["biology", "physics", "math", "chemistry"]}
                    control={control}
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
