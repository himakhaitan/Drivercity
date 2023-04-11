import axios from "axios";
import { BASE_URL } from "./constants";
export const confirmBooking = async (booking) => {
  let res = axios.post("/");
};

export const auth = async (user) => {
  let res = axios.post(`${BASE_URL}/login`, user);
  console.log(res);
};
