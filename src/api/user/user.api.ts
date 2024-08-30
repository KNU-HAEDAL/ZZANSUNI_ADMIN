import {UserInfoModel} from "@/api/user/user.response.ts";
import {axiosClient} from "@/api/AxiosClient.ts";

export async function getUserInfo() :Promise<UserInfoModel> {
  const res = await axiosClient.get('/api/user');
  return res.data;
}