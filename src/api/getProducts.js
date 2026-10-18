import axios from "axios";

const API_URL = "https://jdmflux-api.onrender.com/products";

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
