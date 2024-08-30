import {UserInfoModel} from "@/api/user/user.response.ts";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfoModel;
}