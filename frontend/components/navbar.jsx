import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <>
      <main className="container flex items-center justify-between mx-auto">
        <div className=" items-center gap-2">
          <Image src={"/logo_transparent.png"} width={120} height={52} />
        </div>
        <div className="flex items-center justify-center gap-8">
          <button className="block bg-black/10 backdrop-blur-xl text-white w-[100px] h-10 rounded-[5px] ">
            Login
          </button>
        </div>
      </main>
    </>
  );
};

export default Navbar;
