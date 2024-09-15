import {UserInfoModel} from "@/_user/api/user.response.ts";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfoModel;
}