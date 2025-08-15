import { useEffect } from "react";
import axios from "axios";
import { auth } from "../services/authService";

const axiosSecure = axios.create({
  // baseURL: "https://surplus-share-server.vercel.app", 
  baseURL: "http://localhost:5000", 
});

const useAxiosSecure = () => {
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(async(config) => {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
