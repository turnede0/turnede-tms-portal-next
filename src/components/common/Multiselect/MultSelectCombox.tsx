import { Combobox, Transition } from "@headlessui/react";
import { ScheduleType } from "@src/util/types";
import { Controller, Control } from "react-hook-form";
import { Fragment, useState } from "react";
import { HiChevronDown } from "@react-icons/all-files/hi/HiChevronDown";
import { GrRadialSelected } from "@react-icons/all-files/gr/GrRadialSelected";

function MultSelectCombox(props: {
  formStateValue: string;
  control: Control<ScheduleType, any>;
  option: string[];
}) {
  const [query, setQuery] = useState("");

  const filteredChoice =
    query === ""
      ? props.option
      : props.option.filter((choice) =>
          choice
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
        <div className="top-16 w-full">
          {(value as string[])?.length > 0 && (
            <ul className="flex flex-wrap items-center">
              {(value as string[]).map((choice) => (
                <div key={choice}>
                  <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                    {choice}
                    <span
                      className="cursor-pointer pl-2 hover:text-danger"
                      //delete item from array
                      onClick={() =>
                        onChange((e: string[]) => {
                          let temp = e.filter(function (item) {
                            return item !== choice;
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
          <Combobox value={value} onChange={onChange} multiple>
            <div className="relative mt-1 border-primary border-2 rounded-md">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg  bg-transparent text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 bg-transparent"
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiChevronDown />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredChoice.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredChoice.map((choice) => (
                      <Combobox.Option
                        key={choice}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={choice}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected
                                  ? "font-medium text-white"
                                  : "font-normal"
                              }`}
                            >
                              {choice}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <GrRadialSelected color="white" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      )}
    />
  );
}

export default MultSelectCombox;
