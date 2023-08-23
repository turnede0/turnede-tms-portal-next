"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortDirection,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

type BasicTableType = {
  data: any;
  columns: any;
  handleAdd: () => void;
};

// eslint-disable-next-line no-unused-vars
enum Condition {
  // eslint-disable-next-line no-unused-vars
  includes = "includes",
  // eslint-disable-next-line no-unused-vars
  excludes = "excludes",
  // eslint-disable-next-line no-unused-vars
  between = "between",
  // eslint-disable-next-line no-unused-vars
  equal = "equal to",
  // eslint-disable-next-line no-unused-vars
  not_equal = "not equal to",
  // eslint-disable-next-line no-unused-vars
  larger = "larger than",
  // eslint-disable-next-line no-unused-vars
  smaller = "smaller than",
  // eslint-disable-next-line no-unused-vars
  larger_equal = "larger than or equal to",
  // eslint-disable-next-line no-unused-vars
  smaller_equal = "smaller than or equal to",
}

export default function BasicTable({
  data,
  columns,
  handleAdd,
}: BasicTableType) {
  const t = useTranslations("BasicTable");

  const conditionTranslations = {
    [Condition.includes]: t("filter.condition.includes"),
    [Condition.excludes]: t("filter.condition.excludes"),
    [Condition.between]: t("filter.condition.between"),
    [Condition.equal]: t("filter.condition.equal"),
    [Condition.not_equal]: t("filter.condition.not_equal"),
    [Condition.larger]: t("filter.condition.larger"),
    [Condition.smaller]: t("filter.condition.smaller"),
    [Condition.larger_equal]: t("filter.condition.larger_equal"),
    [Condition.smaller_equal]: t("filter.condition.smaller_equal"),
  };

  const [sorting, setSorting] = useState<SortingState>();
  const [globalFilter, setGlobalFilter] = useState("");

  const [filterMenuOpened, setFilterMenuOpened] = useState(false);
  const [field, setField] = useState("All");
  const [condition, setCondition] = useState(Condition.includes);
  const [numberValue, setNumberValue] = useState([0, 10]);
  const [stringValue, setStringValue] = useState("");

  useEffect(() => {
    if (!filterMenuOpened) {
      table.getColumn(field)?.setFilterValue(null);
      return;
    }
    if (field === "All") {
      setGlobalFilter(stringValue);
    } else {
      switch (condition) {
        case Condition.includes:
          table.getColumn(field)?.setFilterValue(stringValue);
          break;
        case Condition.excludes:
          //table.getColumn(field)?.setFilterValue(stringValue);
          break;
        case Condition.between:
          table
            .getColumn(field)
            ?.setFilterValue([numberValue[0], numberValue[1]]);
          break;
        case Condition.larger:
          table
            .getColumn(field)
            ?.setFilterValue(() => [
              numberValue[0] + Number.EPSILON * 10,
              Number.POSITIVE_INFINITY,
            ]);

          break;
        case Condition.larger_equal:
          table
            .getColumn(field)
            ?.setFilterValue(() => [numberValue[0], Number.POSITIVE_INFINITY]);
          break;
        case Condition.smaller:
          table
            .getColumn(field)
            ?.setFilterValue(() => [
              Number.NEGATIVE_INFINITY,
              numberValue[1] - Number.EPSILON * 10,
            ]);
          break;
        case Condition.smaller_equal:
          table
            .getColumn(field)
            ?.setFilterValue(() => [Number.NEGATIVE_INFINITY, numberValue[1]]);
          break;
        case Condition.equal:
          table
            .getColumn(field)
            ?.setFilterValue(() => [numberValue[0], numberValue[0]]);
          break;
        case Condition.not_equal:
          //
          break;
      }
    }
  }, [field, condition, stringValue, numberValue, filterMenuOpened]);

  const router = useRouter();
  const pathName = usePathname();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="mx-auto max-w-screen-xl">
        <div className="rounded-sm border border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          {/* table header start */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={t("search")}
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                className="flex items-center justify-center text-white  bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={handleAdd}
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                {t("add")}
              </button>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <svg
                    className="-ml-1 mr-1.5 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                  {t("actions")}
                </button>
                <div
                  id="actionsDropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="actionsDropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mass Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete all
                    </a>
                  </div>
                </div>
                <button
                  id="filterDropdownButton"
                  data-dropdown-toggle="filterDropdown"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                  onClick={() => {
                    setFilterMenuOpened(!filterMenuOpened);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4 mr-2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("filter.title")}
                  <svg
                    className="-mr-1 ml-1.5 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
                {/*                 <div
                  id="filterDropdown"
                  className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Choose brand
                  </h6>
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="filterDropdownButton"
                  >
                    <li className="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Apple (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="fitbit"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Microsoft (16)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="razor"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Razor (49)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="nikon"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Nikon (12)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="benq"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        BenQ (74)
                      </label>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
          <div
            id="filterMenu"
            className={`flex item-center justify-between z-10 w-auto p-3 bg-white rounded-lg shadow dark:bg-gray-700 gap-3 ${
              !filterMenuOpened ? "hidden" : "visible"
            }`}
          >
            <div className="flex flex-row items-center">
              <span>{t("filter.field.title")}</span>
              <div className="relative z-20 bg-white dark:bg-form-input">
                <select
                  value={field}
                  onChange={(e) => {
                    setField(e.target.value);
                    setCondition(
                      e.target.value !== "All" &&
                        typeof table
                          .getPreFilteredRowModel()
                          .flatRows[0].getValue(e.target.value) === "number"
                        ? condition === Condition.includes ||
                          condition === Condition.excludes
                          ? Condition.between
                          : condition
                        : condition === Condition.includes ||
                          condition === Condition.excludes
                        ? condition
                        : Condition.includes
                    );
                    console.log(condition);
                  }}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="All">{t("filter.field.all")}</option>
                  {table.getAllColumns().map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.id}
                    </option>
                  ))}
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
            <div className="flex flex-row items-center">
              <span>{t("filter.condition.title")}</span>
              <div className="relative z-20 bg-white dark:bg-form-input">
                <select
                  value={condition}
                  onChange={(e) => {
                    setCondition(e.target.value as Condition);
                  }}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  {field !== "All" &&
                  typeof table
                    .getPreFilteredRowModel()
                    .flatRows[0].getValue(field) === "number" ? (
                    <>
                      <option value={Condition.between}>
                        {conditionTranslations[Condition.between]}
                      </option>
                      <option value={Condition.equal}>
                        {conditionTranslations[Condition.equal]}
                      </option>
                      <option value={Condition.not_equal}>
                        {conditionTranslations[Condition.not_equal]}
                      </option>
                      <option value={Condition.larger}>
                        {conditionTranslations[Condition.larger]}
                      </option>
                      <option value={Condition.smaller}>
                        {conditionTranslations[Condition.smaller]}
                      </option>
                      <option value={Condition.larger_equal}>
                        {conditionTranslations[Condition.larger_equal]}
                      </option>
                      <option value={Condition.smaller_equal}>
                        {conditionTranslations[Condition.smaller_equal]}
                      </option>
                    </>
                  ) : (
                    <>
                      <option value={Condition.includes}>
                        {conditionTranslations[Condition.includes]}
                      </option>
                      <option value={Condition.excludes}>
                        {conditionTranslations[Condition.excludes]}
                      </option>
                    </>
                  )}
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
            <div className="flex flex-row items-center">
              <span>{t("filter.value")}</span>
              {condition !== Condition.between ? (
                condition === Condition.includes ||
                condition === Condition.excludes ? (
                  <input
                    value={stringValue}
                    onChange={(e) => {
                      setStringValue(e.target.value);
                    }}
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                ) : (
                  <input
                    /* min={Number(
                      table
                        .getColumn(field.name)
                        ?.getFacetedMinMaxValues()?.[0] ?? ""
                    )}
                    max={Number(
                      table
                        .getColumn(field.name)
                        ?.getFacetedMinMaxValues()?.[1] ?? ""
                    )} */
                    value={
                      condition === Condition.smaller ||
                      condition === Condition.smaller_equal
                        ? numberValue[1]
                        : numberValue[0]
                    }
                    onChange={(e) => {
                      condition === Condition.smaller ||
                      condition === Condition.smaller_equal
                        ? setNumberValue([
                            numberValue[0],
                            Number(e.target.value),
                          ])
                        : setNumberValue([
                            Number(e.target.value),
                            numberValue[1],
                          ]);
                    }}
                    type="number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                )
              ) : (
                <div className="flex flex-row items-center">
                  <input
                    /* min={Number(
                      table
                        .getColumn(field.name)
                        ?.getFacetedMinMaxValues()?.[0] ?? ""
                    )}
                    max={Number(
                      table
                        .getColumn(field.name)
                        ?.getFacetedMinMaxValues()?.[1] ?? ""
                    )} */
                    onChange={(e) => {
                      setNumberValue([Number(e.target.value), numberValue[1]]);
                    }}
                    value={numberValue[0]}
                    type="number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className=" text-xl font-bold">-</span>
                  <input
                    /* min={Number(
                      table
                        .getColumn(field.name)
                        ?.getFacetedMinMaxValues()?.[0] ?? ""
                    )}
                    max={Number(
                      table
                        .getColumn(field.name)
                        ?.getFacetedMinMaxValues()?.[1] ?? ""
                    )} */
                    onChange={(e) => {
                      setNumberValue([numberValue[0], Number(e.target.value)]);
                    }}
                    value={numberValue[1]}
                    type="number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              )}
            </div>
          </div>
          {/* table header end */}
          {/* table body start */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">checkbox</label>
                      </div>
                    </th>

                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-6 py-3"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {
                              { asc: "🔼", desc: "🔽" }[
                                (header.column.getIsSorted() as SortDirection) ??
                                  null
                              ]
                            }
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border-b dark:bg-black dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-slate-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-2"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">checkbox</label>
                      </div>
                    </td>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="w-4 p-4"
                        onClick={() =>
                          router.push(`${pathName}/${row.getValue("id")}`)
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>{t("page")}</div>
              <strong>
                {table.getState().pagination.pageIndex + 1}
                {t("of")} {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              {`| ${t("go2page")}`}
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {`${t("show")} ${pageSize}`}
                </option>
              ))}
            </select>
          </div>
          {/* table body  */}
        </div>
      </div>
    </section>
  );
}
