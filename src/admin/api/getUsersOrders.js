import axios from "axios";
const API_URL = "https://jdmflux-api.onrender.com/orders";

export const getUsersOrders = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
