import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import secureLocalStorage from "react-secure-storage";
import {useUserState} from "@/_user/hooks/userState.ts";
import {ROUTE_PATH} from "@/global/const/data.ts";

export default function DashboardLayout() {
  const nav = useNavigate();
  const {user, error} = useUserState();

  useEffect(() => {
    if(secureLocalStorage.getItem('accessToken') === null) {
      nav(ROUTE_PATH.LOGIN);
      return;
    }
    if(user && user.role === 'USER'){
      nav(ROUTE_PATH.ROOT);
      alert('권한이 없습니다.');
      return;
    }
  }, []);

  useEffect(() => {
    if(error != null) {
      console.log(error, 'goto login');
      nav(ROUTE_PATH.LOGIN);
    }
  }, [error]);

  if(!user) {
    return (<></>);
  }


  return (
    <div className="w-full h-full">
      <div>
        <Outlet  />
      </div>

    </div>
  );
}
