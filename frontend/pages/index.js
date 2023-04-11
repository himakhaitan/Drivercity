import Image from "next/image";
import React from "react";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";
import Loader from "../components/loader";
import Auth from "../components/auth";

const Lading = () => {
  return (
    <>
      <section className="w-full font-primary hero relative h-[100vh]">
        <div className="overlay absolute top-0 w-full h-[100vh] bg-gradient-to-b from-black/10 to-black/90 -z-10"></div>
        <main className="container mx-auto">
          <Navbar />
          <div className="flex flex-col gap-5 justify-center h-[700px]">
            <div className="text-7xl font-semibold text-white max-w-[800px]">
              Travel Without Limits
            </div>
            <div className="text-xl ml-3 text-white font-medium max-w-[600px]">
              For those who yearn to not just discover a new destination, but to
              embrace it, to dive beneath the surface, forge new connections and
              explore like a local.These are moments you will never forget.
            </div>
            <div className="h-[100px]"></div>
            <SearchBar />
          </div>
        </main>
      </section>
      <Auth />
      {/* <Loader /> */}
    </>
  );
};

export default Lading;
