import axios from "axios";
import { BASE_URL } from "../constants";
export const confirmBooking = async (booking) => {
  let res = axios.post("/");
};

export const auth = async (user) => {
  try {
    let res = await axios.post(`${BASE_URL}/auth/login`, {
      email: user.email,
      password: user.password,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
