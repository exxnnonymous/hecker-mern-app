import axios from "axios";

// base url to make request to the movie api database
const axiosInstance = axios.create({
  baseURL: "https://exo-hecker.herokuapp.com/api",
});

export default axiosInstance;
