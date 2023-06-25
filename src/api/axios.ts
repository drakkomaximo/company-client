import axios from "axios";
import { API_URL } from "../utils";

const axiosIntance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosIntance;
