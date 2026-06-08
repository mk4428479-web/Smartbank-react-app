import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error("[api]", err?.message);
    return Promise.reject(err);
  },
);

export const fetchQuotes = async () => {
  const { data } = await api.get("/quotes?limit=5");
  return data;
};
