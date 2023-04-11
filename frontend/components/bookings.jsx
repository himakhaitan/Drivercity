import { useContext } from "react";
import React from "react";
import GLOBAL_CONTEXT from "../context/store";

const Bookings = ({ departure, mode, fare, from, to }) => {
  const { booking } = useContext(GLOBAL_CONTEXT);

  return (
    <>
      <main className="max-w-[900px] font-primary shadow-xl p-6 text-white w-full min-h-[100px] fixed bottom-10 mx-auto bg-gradient-to-r from-green-700 to-cyan-800 rounded-lg flex flex-col gap-2">
        <div className="text-xl font-bold">Current Booking Details</div>
        <div className="grid grid-cols-4">
          <span className="block flex flex-col">
            AIR INDIA 13707
            <span className="text-sm">
              From {booking.from} to {booking.to}
            </span>
          </span>
          <span className="block flex flex-col">
            Departure : {booking.depart}
            <span className="text-sm">Mode : {booking.mode}</span>
          </span>
          <span className="block flex flex-col">Fare : {booking.fare} INR</span>
          <span className="block bg-black items-center justify-center rounded-lg h-16 flex flex-col">
            Checkout
          </span>
        </div>
      </main>
    </>
  );
};

export default Bookings;
