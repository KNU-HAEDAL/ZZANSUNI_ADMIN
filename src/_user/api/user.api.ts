import {UserInfoModel} from "@/_user/api/user.response.ts";
import {axiosClient} from "@/global/api/AxiosClient.ts";

export async function getUserInfo() :Promise<UserInfoModel> {
  const res = await axiosClient.get('/api/user');
  return res.data;
}