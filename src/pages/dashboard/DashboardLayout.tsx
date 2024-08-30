import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import secureLocalStorage from "react-secure-storage";
import {getUserInfo} from "@/api/user/user.api.ts";
import {useQuery} from "@tanstack/react-query";
import {UserInfoModel} from "@/api/user/user.response.ts";
import {ApiError} from "@/api/ApiError.ts";

export default function DashboardLayout() {
  const nav = useNavigate();
  const { data,error} = useQuery<UserInfoModel, ApiError>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if(secureLocalStorage.getItem('accessToken') === null) {
      nav('/login');
      return;
    }
    if(data && data.id <0){//TODO 어드민이 아닐때, 권한 검사
      nav('/');
      return;
    }
  }, []);

  useEffect(() => {
    if(error != null) {
      console.log(error, 'goto login');
      nav('/login');
    }
  }, [error]);


  return (
    <div className="w-full h-full">
      <div>
        <Outlet  />
      </div>

    </div>
  );
}
