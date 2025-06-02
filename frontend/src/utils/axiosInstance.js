import axios from "axios";
import { BASE_URL } from "./apiPaths";

 const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const acessToken = localStorage.getItem("token");
    if (acessToken) {
      config.headers.Authorization = `Bearer ${acessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) =>{
if(error.response){
    if(error.response.status===401){
        window.location.href="/";
    }else if(error.response.status===500){
        console.log("Server Error,Please try again later.");
    }
}else if(error.code==="ECONNABORTED"){
    console.log("Request timed out,Please try again later.");
}
return Promise.reject(error);
  }
);

export default axiosInstance;