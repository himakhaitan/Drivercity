import React from "react";

const JourneyCard = ({ mode, arrival, depart, fare, from }) => {
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
          <button className="bg-black/90 hover:bg-black rounded-[8px] w-[150px] h-12 text-white font-medium">
            Book
          </button>
        </div>
      </main>
    </>
  );
};

export default JourneyCard;
