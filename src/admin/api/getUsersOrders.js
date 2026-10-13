import axios from "axios";
const API_URL = "http://localhost:3000/orders";

export const getUsersOrders = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
