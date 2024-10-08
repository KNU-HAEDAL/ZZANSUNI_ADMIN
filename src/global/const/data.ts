const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=mystate`;

export const ROUTE_PATH = {
  ROOT: "/",
  DASHBOARD_HOME: "/dashboard",
  DASHBOARD_CHALLENGE_GROUP: "/dashboard/challenge-group",
  DASHBOARD_CHALLENGE_REVIEW: "/dashboard/challenge-review",
  DASHBOARD_MY: "/dashboard/my",
  DASHBOARD_MANAGE_ACCOUNT: "/dashboard/manage-account",
  LOGIN: "/login",
};
