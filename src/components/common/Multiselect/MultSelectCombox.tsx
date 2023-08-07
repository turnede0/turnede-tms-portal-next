import { Combobox, Transition } from "@headlessui/react";
import { ScheduleType } from "@src/util/types";
import { Controller, Control } from "react-hook-form";
import { Fragment, useState } from "react";
import { HiChevronDown } from "@react-icons/all-files/hi/HiChevronDown";

function MultSelectCombox(props: {
  formStateValue: string;
  control: Control<ScheduleType, any>;
  option: string[];
}) {
  const [query, setQuery] = useState("");

  const filteredChoice =
    query === ""
      ? props.option
      : props.option.filter((person) =>
          person
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Controller
      //@ts-ignore
      name={props.formStateValue ?? "id"}
      control={props.control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <div className="flex flex-col relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
          <Combobox value={value} onChange={onChange} multiple>
            {({ open }) => (
              <>
                {(value as string[])?.length > 0 && (
                  <ul className="flex flex-wrap items-center">
                    {(value as string[]).map((person) => (
                      <div key={person}>
                        <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                          {person}
                          <span
                            className="cursor-pointer pl-2 hover:text-danger"
                            //delete item from array
                            onClick={() =>
                              onChange((e: string[]) => {
                                let temp = e.filter(function (item) {
                                  return item !== person;
                                });
                                console.log("temp=", temp);
                                return temp;
                              })
                            }
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                    ))}
                  </ul>
                )}
                <div className="flex flex-row w-full">
                  <Combobox.Input
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="flex items-center px-2">
                    <HiChevronDown />
                  </Combobox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    show={open}
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="block absolute top-24 bg-black w-5/6">
                      {filteredChoice.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        <>
                          {filteredChoice.map((person) => (
                            <Combobox.Option
                              key={person}
                              value={person}
                              className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                            >
                              {person}
                            </Combobox.Option>
                          ))}
                        </>
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Combobox>
        </div>
      )}
    />
  );
}

export default MultSelectCombox;
