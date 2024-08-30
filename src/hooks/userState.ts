import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserInfoModel} from "@/api/user/user.response.ts";
import {ApiError} from "@/api/ApiError.ts";
import {getUserInfo} from "@/api/user/user.api.ts";
import {emailLogin} from "@/api/auth/auth.api.ts";
import secureLocalStorage from "react-secure-storage";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/const/data.ts";
import {LoginResponse} from "@/api/auth/auth.response.ts";

export interface UserState {
  user?: UserInfoModel;
  error: ApiError | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export function useUserState(): UserState {
  const {data, error} = useQuery<UserInfoModel, ApiError>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  const queryClient = useQueryClient();
  //useMutation의 제네릭은 다음과 같습니다
  //1. 성공 시 반환되는 데이터의 타입
  //2. 실패 시 반환되는 에러의 타입
  //3. mutationFn에 전달되는 데이터의 타입
  //4. onMutate에서 반환되는 데이터의 타입. 여기서 반환하는 데이터는 onSettled에서 사용할 수 있습니다.
  const userMutation = useMutation<void, ApiError, void, void>({
    mutationFn: async () => {
      console.log('mutationFn');
    },
    onSuccess: async () => {
      console.log('onSuccess');
      await queryClient.cancelQueries({
        queryKey: ['userInfo'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });
    }
  });
  const loginMutation = useMutation<
    LoginResponse,
    ApiError,
    {email: string, password: string},
    LoginResponse
  >({
    mutationFn: async ({email, password}) => {
      return await emailLogin({email, password});
    },
    onSuccess: async (response) => {
      secureLocalStorage.setItem(ACCESS_TOKEN, response.accessToken);
      secureLocalStorage.setItem(REFRESH_TOKEN, response.refreshToken);
      await queryClient.setQueryData(['userInfo'], response.userInfo);
      return response;
    }
  });


  return {
    user: data,
    logout: () => {
      userMutation.mutate();
    },
    login: async (email: string, password: string) => {
      await loginMutation.mutateAsync({email, password});
      return
    },
    error: error,
  };
}