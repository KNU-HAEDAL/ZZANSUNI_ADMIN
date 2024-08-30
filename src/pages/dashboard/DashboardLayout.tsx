import {Link, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import secureLocalStorage from "react-secure-storage";
import {getUserInfo} from "@/api/user/user.api.ts";
import {useQuery} from "@tanstack/react-query";
import {UserInfoModel} from "@/api/user/user.response.ts";
import {ApiError} from "@/api/ApiError.ts";

export default function DashboardLayout() {
  const nav = useNavigate();
  const { error} = useQuery<UserInfoModel, ApiError>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  /**
   * 대시보드 URL로 접근시, 로그인이 안되어있다면 정보 불러오기 시도 후, 로그인 페이지로 이동
   * 1. 메인화면에서 대시보드로 온경우, 로그인시도는 이미 되어있음. 로그인을 했다면 if문을 지나친다.
   * 2. 대시보드 URL로 직접 접근한 경우, 로그인이 안되어있으면 로그인 페이지로 이동
   */
  useEffect(() => {
    if(secureLocalStorage.getItem('accessToken') === null) {
      nav('/login');
      return;
    }
  }, []);

  useEffect(() => {
    if(error) {
      nav('/login');
    }
  }, [error]);


  return (
    <div className="w-full h-full">
      <div className="w-full h-[60px]">
        {
          navList.map((item, index) => {
            return (
              <NavItem key={index} name={item.name} path={item.path} />
            );
          })
        }
      </div>
      <div>
        <Outlet  />
      </div>

    </div>
  );
}

const NavItem = ({name, path} : {
  name: string,
  path: string
}) => {
  return (
    <div className="inline-block h-full w-[120px] text-center">
      <Link
        to={path}
        className="h-full flex items-center justify-center
        text-white text-[12px] font-light px-2.5 py-0.5
        border border-buttonGreenBorder
         rounded-[6px] hover:text-white
         hover:bg-[#38996b]/80 bg-buttonGreen"
      >
        {name}
      </Link>
    </div>
  );

}

const navList = [
  {
    name: '홈',
    path: '/'
  },
  {
    name: '대시보드',
    path: '/dashboard'
  },
  {
    name: '챌린지그룹',
    path: '/dashboard/challenge-group'
  }
];