import React from "react";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";
import JourneyCard from "../components/journeyCard";
import Bookings from "../components/bookings";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { from, to, date, mode } = router.query;
  console.log(from, to, date, mode);
  return (
    <>
      <section className="search-hero font-primary h-[300px] relative w-full">
        <main className="flex container mx-auto items-center flex-col gap-12">
          <Navbar />
          <div className="absolute -bottom-[50px]">
            <SearchBar />
          </div>
        </main>
      </section>
      <section className="flex font-primary  my-[100px] flex-col max-w-[900px] mx-auto  gap-6">
        <main className="grid grid-cols-5 place-items-center">
          <div className="font-bold text-base text-gray-600">Mode</div>
          <div className="font-bold text-base text-gray-600">Departure</div>
          <div className="font-bold text-base text-gray-600">Arrival</div>
          <div className="font-bold text-base text-gray-600">Fare</div>
        </main>
        <JourneyCard
          mode={"Flight"}
          fare={7227}
          depart={"12:11"}
          arrival={"15:30"}
        />

        <Bookings />
      </section>
    </>
  );
};

export default Search;
