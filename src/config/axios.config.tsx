import { AppContext } from "@context/AppContext";
import { useTokenCookies } from "@hooks/useTokenCookies";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axiosRetry, { isRetryableError } from "axios-retry";
import { useEffect, useContext } from "react";

export const server = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

axiosRetry(server, {
  // retries on network errors with status 5xx
  retries: 3,
  retryCondition: isRetryableError,
});

interface IAxiosInterceptorHOCProps {
  children: React.ReactElement;
}

export const AxiosInterceptorHOC = ({
  children,
}: IAxiosInterceptorHOCProps) => {
  const { setIsLoading } = useContext(AppContext);
  const { token } = useTokenCookies();

  useEffect(() => {
    const successReqInterceptor = (config: InternalAxiosRequestConfig) => {
      setIsLoading(true);

      const headers = config.headers || {};
      headers.Authorization = `Bearer ${token}`;
      config.headers = headers;

      return config;
    };

    const errReqInterceptor = (error: AxiosError) => {
      return Promise.reject(error);
    };

    const successResInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errResInterceptor = (error: any) => {
      return Promise.reject(error);
    };

    // Add a request interceptor
    const reqInterceptor = server.interceptors.request.use(
      successReqInterceptor,
      errReqInterceptor
    );
    // Add a response interceptor
    const resInterceptor = server.interceptors.response.use(
      successResInterceptor,
      errResInterceptor
    );

    return () => {
      server.interceptors.request.eject(reqInterceptor);
      server.interceptors.response.eject(resInterceptor);
    };
  }, [setIsLoading]);

  return children;
};
