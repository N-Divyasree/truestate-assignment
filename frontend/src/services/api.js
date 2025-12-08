import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const getSales = async () => {
  const res = await API.get("/api/sales");
  return res.data;
};
