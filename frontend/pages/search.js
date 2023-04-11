import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";
import JourneyCard from "../components/journeyCard";
import axios from "axios";
import Bookings from "../components/bookings";
import { useRouter } from "next/router";
import { BASE_URL } from "../constants";
import Loader from "../components/loader";

const Search = () => {
  const [journeys, setJourneys] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { from, to, mode } = router.query;

  const bookHandler = (e) => {
    setIsBooking(true);
  };

  useEffect(() => {
    const fetchJourneys = async () => {
      let response = await axios.get(
        `${BASE_URL}/journey/fetch?from=${from}&to=${to}&mode=${mode}`
      );
      setJourneys(response.data.result);
    };
    fetchJourneys();
    setLoading(false);
  }, [from, to, mode]);

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
          <div className="font-bold text-base text-gray-600">To</div>
          <div className="font-bold text-base text-gray-600">Fare</div>
        </main>
        {journeys.map((journey) => {
          return (
            <JourneyCard
              key={journey.journey_id}
              mode={`${journey.means
                .charAt(0)
                .toUpperCase()}${journey.means.slice(1)}`}
              fare={journey.fare}
              from={journey.starttitle}
              depart={journey.journey_time.slice(0, 10)}
              arrival={journey.endtitle}
              handler={bookHandler}
              isBooking={isBooking}
            />
          );
        })}
      </section>
      {loading && <Loader />}
    </>
  );
};

export default Search;
