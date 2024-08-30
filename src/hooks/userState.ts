import {useMutation, useQuery} from "@tanstack/react-query";
import {UserInfoModel} from "@/api/user/user.response.ts";
import {ApiError} from "@/api/ApiError.ts";
import {getUserInfo} from "@/api/user/user.api.ts";

export interface UserState {
  user?: UserInfoModel;
  changeUser: (user: UserInfoModel) => void;
}

export function useUserState(): UserState {
  const {data} = useQuery<UserInfoModel, ApiError>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  //useMutation의 제네릭은 다음과 같습니다
  //1. 성공 시 반환되는 데이터의 타입
  //2. 실패 시 반환되는 에러의 타입
  //3. mutationFn에 전달되는 데이터의 타입
  //4. onMutate에서 반환되는 데이터의 타입. 여기서 반환하는 데이터는 onSettled에서 사용할 수 있습니다.
  const userMutation = useMutation<void, ApiError, UserInfoModel, void>({
    mutationFn: async (user) => {
      console.log('mutationFn', user);
    },
    onMutate: async (user) => {
      // mutationFn이 호출되기 전에 이 함수가 호출됩니다.
      console.log('onMutate', user);
    },
    onError: async (error, user) => {
      // mutationFn이 실패하면 이 함수가 호출됩니다.
      console.log('onError', error, user);
    },
    onSettled: async (user, error) => {
      // mutationFn이 성공하거나 실패하면 이 함수가 호출됩니다.
      console.log('onSettled', user, error);
    },
    onSuccess: async (user) => {
      // mutationFn이 성공하면 이 함수가 호출됩니다.
      console.log('onSuccess', user);
    }
  });

  return {
    user: data,
    changeUser: userMutation.mutate,
  };
}