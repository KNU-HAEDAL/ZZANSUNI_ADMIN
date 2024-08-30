import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserInfoModel} from "@/api/user/user.response.ts";
import {ApiError} from "@/api/ApiError.ts";
import {getUserInfo} from "@/api/user/user.api.ts";
import {emailLogin} from "@/api/auth/auth.api.ts";
import secureLocalStorage from "react-secure-storage";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/const/data.ts";
import {LoginResponse} from "@/api/auth/auth.response.ts";
import {EmailLoginRequest} from "@/api/auth/auth.request.ts";

export interface UserState {
  user?: UserInfoModel;
  error: ApiError | null;
  login: (req:EmailLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export function useUserState(): UserState {
  const {data, error} = useQuery<UserInfoModel, ApiError>({
    queryKey: ['userInfo'],
    enabled: secureLocalStorage.getItem(ACCESS_TOKEN) !== null, // 토큰이 없으면 쿼리를 실행x
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 60, // 1시간동안 캐시 유지
  });

  const queryClient = useQueryClient();
  //onMutate는 mutationFn이 실행되기 전에 호출되는 함수입니다.
  //onSettled는 finally와 비슷한 역할을 합니다.
  //onSuccess는 mutationFn이 성공적으로 실행된 후 호출되는 함수입니다.
  //onError는 mutationFn이 에러를 반환했을 때
  //mutate는 onSuccess, onError을 통해 성공했을시, 실패했을시 response 데이터를 핸들링

  //useMutation의 제네릭은 다음과 같습니다
  //1. 성공 시 반환되는 데이터의 타입 (data, onSuccess에서 반환하는 데이터)
  //2. 실패 시 반환되는 에러의 타입
  //3. mutationFn에 전달되는 데이터의 타입(onSuccess, onError, onMutate, onSettled)
  //4. onMutate에서 반환되는 데이터의 타입. (onSuccess, onError, onSettled)에서 활용
  const userMutation = useMutation<void>({
    mutationFn: async () => {
      console.log('mutationFn');
    },
    onSuccess: async () => {
      console.log('onSettled');
      queryClient.removeQueries({
        queryKey: ['userInfo'],
      });
      secureLocalStorage.removeItem(ACCESS_TOKEN);
      secureLocalStorage.removeItem(REFRESH_TOKEN);
    }
  });
  const loginMutation = useMutation<
    LoginResponse,
    ApiError,
    EmailLoginRequest,
    LoginResponse
  >({
    mutationFn: emailLogin,
    onSuccess: async (response) => {
      secureLocalStorage.setItem(ACCESS_TOKEN, response.accessToken);
      secureLocalStorage.setItem(REFRESH_TOKEN, response.refreshToken);
      await queryClient.setQueryData(['userInfo'], response.userInfo);
    },
  });


  return {
    user: data,
    logout: userMutation.mutateAsync,
    login: async (req:EmailLoginRequest) => {
      await loginMutation.mutateAsync(req);
    },
    error: error,
  };
}