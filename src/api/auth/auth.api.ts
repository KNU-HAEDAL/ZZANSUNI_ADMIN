import {axiosClient} from "@/api/AxiosClient.ts";
import {CreateManagerRequest, EmailLoginRequest, OAuthLoginRequest} from "@/api/auth/auth.request.ts";

import {LoginResponse} from "@/api/auth/auth.response.ts";
import {ApiResponse} from "@/api/ApiResonpse.ts";

export async function emailLogin(req: EmailLoginRequest) : Promise<LoginResponse> {
  const axiosResponse = await axiosClient.post('/api/auth/login', req);
  return axiosResponse.data;
}

export async function oauthLogin(req: OAuthLoginRequest): Promise<LoginResponse> {
  const axiosResponse = await axiosClient.post('/api/auth/oauth', req);
  const apiResponse : ApiResponse<LoginResponse> = axiosResponse.data;

  return apiResponse.data;
}

export async function logout() {
  await axiosClient.post('/api/auth/logout');
}

export async function createManager(req: CreateManagerRequest) {
  await axiosClient.post('/api/admin/auth/manager', req);
  return;
}