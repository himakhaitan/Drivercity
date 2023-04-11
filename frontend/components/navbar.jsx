import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import GLOBAL_CONTEXT from "../context/store";
import Auth from "./auth";
import Loader from "./loader";

const Navbar = () => {
  const { user, isAuthenticating } = useContext(GLOBAL_CONTEXT);
  const [authenticateUser, setAuthenticateUser] = useState(false);
  useEffect(() => {
    if (isAuthenticating && !user._isAuthenticated) {
      setAuthenticateUser(false);
    }
  }, [isAuthenticating]);
  return (
    <>
      <main className="container flex items-center justify-between mx-auto">
        <div className=" items-center gap-2">
          <Image src={"/logo.png"} width={120} height={52} />
        </div>
        <div className="flex items-center justify-center gap-8">
          {!user._isAuthenticated ? (
            <button
              onClick={() => setAuthenticateUser(true)}
              className="block bg-white/50 hover:bg-white text-black w-[100px] h-10 rounded-[5px] "
            >
              Login
            </button>
          ) : (
            <>Logged in</>
          )}
        </div>
      </main>
      {authenticateUser && !isAuthenticating && <Auth />}
      {isAuthenticating && (
        <Loader message={"Hold tight while we are loggin you in!"} />
      )}
    </>
  );
};

export default Navbar;
