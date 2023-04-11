import React, { useContext } from "react";
import GLOBAL_CONTEXT from "../context/store";

const Auth = () => {
  const { setUser, user, handleAuth } = useContext(GLOBAL_CONTEXT);
  return (
    <>
      <main className="fixed font-primary z-[9999] top-0 w-full h-full bg-black/70 flex items-center justify-center">
        <div className="bg-white flex flex-col items-center justify-center gap-4  w-[400px] min-h-[500px] rounded-lg p-2">
          <div className="text-2xl text-center text-black/80 text-zinc-900 font-medium">
            Login to <br />{" "}
            <span className="font-bold text-3xl text-red-500">Drivercity</span>
          </div>
          <div className="flex flex-col gap-8">
            <span className="block flex flex-col ">
              <span className="text-base text-gray-800/50 font-medium">
                Email
              </span>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                className="outline-none p-2 bg-transparent border-b-2 border-gray-700 text-lg "
                placeholder="yourname@example.com"
              />
            </span>
            <span className="block flex flex-col ">
              <span className="text-base text-gray-800/50 font-medium">
                Password
              </span>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="outline-none p-2 bg-transparent border-b-2 border-gray-700 text-lg "
                placeholder=""
              />
            </span>
            <button
              onClick={handleAuth}
              className="bg-black mx-auto w-full h-12 rounded-[8px] text-white"
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Auth;
