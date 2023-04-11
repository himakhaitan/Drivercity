import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import GLOBAL_CONTEXT from "../context/store";
import Link from "next/link";

const SearchBar = ({ setLoading }) => {
  const { setBooking } = useContext(GLOBAL_CONTEXT);
  const [dept, setDept] = useState(new Date());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [mode, setMode] = useState("ANY");
  const [showModeList, setShowModeList] = useState(false);
  // const days = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //   useEffect(() => {
  //     console.log(dept.toLocaleDateString());
  //     console.log(dept.getDate());
  //     console.log(month[dept.getUTCMonth()]);
  //   }, [dept]);

  return (
    <>
      <main className="flex shadow-xl rounded-lg max-w-max flex-col">
        <div className=" max-w-[220px] gap-2 p-3 h-16 flex items-center justify-center  rounded-t-[5px] text-base text-red-500 font-bold bg-white">
          Find your destination{" "}
        </div>
        <div className="w-[900px] py-5 rounded-[8px] -mt-[5px] bg-white grid grid-cols-5 place-items-center gap-8">
          <span className="block ml-5 flex flex-col gap-">
            <span className="block text-sm text-gray-600 font-semibold">
              Leaving from
            </span>
            <input
              type={"text"}
              className={
                "outline-none text-2xl font-bold text-gray-900  bg-transparent w-full"
              }
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Durgapur"
            />
          </span>
          <span className="block flex flex-col gap-">
            <span className="block text-sm text-gray-600 font-semibold">
              Going to
            </span>
            <input
              type={"text"}
              className={
                "outline-none text-2xl focus:border-b-[2px] focus:border-black/50 font-bold text-gray-900  bg-transparent w-full"
              }
              onChange={(e) => setTo(e.target.value)}
              placeholder="Durgapur"
            />
          </span>
          <span
            onMouseLeave={() => setShowCalendar(false)}
            className="block flex relative flex-col gap-"
          >
            <span className="block flex gap-2 items-center gap-4 justify-between text-sm text-gray-600 font-semibold">
              <span className="block">Departure Date</span>
              <span
                className="cursor-pointer"
                onClick={() => setShowCalendar(true)}
              >
                <span className="block">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.29277 6.94994L5.99977 7.65694L11.6568 1.99994L10.2428 0.585938L5.99977 4.82794L1.75677 0.585938L0.342773 1.99994L5.29277 6.94994Z"
                      fill="#111111"
                    />
                  </svg>
                </span>
              </span>
            </span>
            <span className="block flex flex-col ">
              <span className="text-2xl font-semibold text-gray-900">
                {dept.getDate()}{" "}
                <span className="text-xl font-bold">
                  {month[dept.getUTCMonth()]}
                </span>
              </span>
            </span>
            {showCalendar && (
              <div className="absolute top-[50px]">
                <Calendar onChange={setDept} value={dept} />
              </div>
            )}
          </span>
          <span
            onMouseLeave={() => setShowModeList(false)}
            className="block  relative flex flex-col gap-"
          >
            <span className="block flex items-center gap-3 justify-between text-sm text-gray-600 font-semibold">
              Mode{" "}
              <span
                className="block cursor-pointer"
                onClick={() => setShowModeList(true)}
              >
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.29277 6.94994L5.99977 7.65694L11.6568 1.99994L10.2428 0.585938L5.99977 4.82794L1.75677 0.585938L0.342773 1.99994L5.29277 6.94994Z"
                    fill="#111111"
                  />
                </svg>
              </span>
            </span>
            <span className="font-semibold text-gray-900 text-2xl">{mode}</span>
            {showModeList && (
              <span className="block absolute top-[50px]  w-[130px] rounded-[3px] text-gray-900  shadow-lg flex bg-white flex-col">
                <span
                  onClick={(e) => setMode(e.target.textContent)}
                  className="p-1 flex items-center font-semibold hover:bg-gray-300/50 curor-pointer"
                >
                  ANY
                </span>
                <span
                  onClick={(e) => setMode(e.target.textContent)}
                  className="p-1 flex items-center font-semibold hover:bg-gray-300/50 curor-pointer"
                >
                  Flight
                </span>
                <span
                  onClick={(e) => setMode(e.target.textContent)}
                  className="p-1 flex items-center font-semibold hover:bg-gray-300/50 curor-pointer"
                >
                  Bus
                </span>
                <span
                  onClick={(e) => setMode(e.target.textContent)}
                  className="p-1 flex items-center font-semibold hover:bg-gray-300/50 curor-pointer"
                >
                  Train
                </span>
              </span>
            )}
          </span>
          <div className="max-w-min flex  cursor-pointer font-bold">
            <Link
              href={{
                pathname: "/search",
                query: {
                  from: from,
                  to: to,
                  date: dept.toLocaleDateString(),
                  mode: mode.toLowerCase(),
                },
              }}
            >
              Check Availability
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchBar;
