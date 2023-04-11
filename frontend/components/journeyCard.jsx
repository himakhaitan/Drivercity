import React, { useContext } from "react";
import Bookings from "./bookings";
import GLOBAL_CONTEXT from "../context/store";
const JourneyCard = ({
  mode,
  arrival,
  depart,
  fare,
  from,
  handler,
  isBooking,
}) => {
  const { setBooking } = useContext(GLOBAL_CONTEXT);

  const setHandler = () => {
    setBooking({
      from: from,
      to: arrival,
      fare: fare,
      mode: mode,
      depart: depart,
    })
  };
  return (
    <>
      <main className="p-2 border-[0.5px]  bg-gray-50 place-items-center grid grid-cols-5">
        <div className="flex flex-col ">
          <span className="block">{mode}</span>
        </div>
        <div>{depart}</div>
        <div>{arrival}</div>
        <div>INR {fare}</div>
        <div>
          <button
            onClick={() => {
              setHandler();
              handler();
            }}
            className="bg-black/90 hover:bg-black rounded-[8px] w-[150px] h-12 text-white font-medium"
          >
            Book
          </button>
        </div>
      </main>
      {isBooking && (
        <Bookings
          mode={mode}
          from={from}
          to={arrival}
          fare={fare}
          departure={depart}
        />
      )}
    </>
  );
};

export default JourneyCard;
