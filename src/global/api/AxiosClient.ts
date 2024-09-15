import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import {ApiResponse} from "@/global/api/ApiResonpse.ts";
import {ApiError} from "@/global/api/ApiError.ts";
import {ACCESS_TOKEN, API_BASE_URL, REFRESH_TOKEN} from "@/global/const/data.ts";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cross-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


axiosClient.interceptors.response.use(
  (response) => {
    const apiResponse : ApiResponse<any> = response.data
    // 200번대 응답이지만 result가 FAIL인 경우
    // 응답 body에서 받은 에러코드와 메시지로 에러 객체 생성 후 throw
    if(apiResponse.result === 'FAIL') {
      throw new ApiError({
        errorCode: apiResponse.errorCode,
        message: apiResponse.message,
        statusCode: response.status
      })
    }
    return {
      ...response,
      data: apiResponse.data
    }
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        return Promise.reject(error);
      }
      const resp = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Cross-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      if (resp.ok) {
        console.log('토큰 재발급 성공');
        const res = await resp.json();
        secureLocalStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
        secureLocalStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
        return axiosClient(originalRequest);
      }else{
        console.log('토큰 재발급 실패');
        secureLocalStorage.removeItem(ACCESS_TOKEN);
        secureLocalStorage.removeItem(REFRESH_TOKEN);
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
    // 응답 body에서 받은 에러코드와 메시지로 에러 객체 생성 후 throw
    const resBody = error.response.data;
    if(resBody.result === 'FAIL') {
      throw new ApiError({
        errorCode: resBody.errorCode,
        message: resBody.message,
        statusCode: error.response.status
      })
    }
    return Promise.reject(error);
  },
);