import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

export const requestLog = (config: AxiosRequestConfig) => {
  return config;
};

export function requestError(error: AxiosError) {
  console.log(error);
  return Promise.reject(error);
}

export function responseLog(response: AxiosResponse) {
  const config = response.config;
  console.log(`<<< ${response.status} ${config.method}: ${config.url}`);
  return response;
}

export function responseError(error: AxiosError) {
  console.log(error);
  return Promise.reject(error);
}
