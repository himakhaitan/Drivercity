import React from "react";

const Bookings = () => {
  return (
    <>
      <main className="max-w-[900px] font-primary shadow-xl p-6 text-white w-full min-h-[100px] fixed bottom-10 mx-auto bg-gradient-to-r from-green-700 to-cyan-800 rounded-lg flex flex-col gap-2">
        <div className="text-xl font-bold">Current Booking Details</div>
        <div className="grid grid-cols-4">
          <span className="block flex flex-col">
            AIR INDIA 13707
            <span className="text-sm">From Bangalore to New Delhi</span>
          </span>
          <span className="block flex flex-col">
            Departure : 17:55
            <span className="text-sm">Arrival : 21:30</span>
          </span>
          <span className="block flex flex-col">Fare : 7756 INR</span>
          <span className="block bg-black items-center justify-center rounded-lg h-16 flex flex-col">
            Checkout
          </span>
        </div>
      </main>
    </>
  );
};

export default Bookings;
