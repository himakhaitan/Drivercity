import React from "react";

const Loader = ({ message }) => {
  return (
    <>
      <main className="fixed top-0 w-full h-full bg-black/70 flex items-center justify-center">
        <div className="bg-white flex flex-col items-center justify-center gap-4  w-[400px] h-[300px] rounded-lg p-2">
          <div className="w-8 h-8 border-b-2 border-t-2 border-l-2 border-red-600 rounded-full animate-spin "></div>
          <div className="font-bold max-w-[250px] text-center font-primary text-base">
            Hold tight while we find the best journey for you.
          </div>
        </div>
      </main>
    </>
  );
};

export default Loader;
