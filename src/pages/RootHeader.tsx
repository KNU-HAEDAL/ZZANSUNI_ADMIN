import {Link, useNavigate} from "react-router-dom";
import {useUserState} from "@/hooks/userState.ts";
import secureLocalStorage from "react-secure-storage";
import {ACCESS_TOKEN, REFRESH_TOKEN, ROUTE_PATH} from "@/const/data.ts";

const menuItems = [
  {label: '대시보드', href: ROUTE_PATH.DASHBOARD_HOME},
  {label: '챌린지 그룹', href: ROUTE_PATH.DASHBOARD_CHALLENGE_GROUP},
  {label: '챌린지 리뷰', href: ROUTE_PATH.DASHBOARD_CHALLENGE_GROUP},
  {label: '마이페이지', href: ROUTE_PATH.DASHBOARD_MY},
]

export const RootHeaderHeight = '80px';

export default function RootHeader() {
  return (
    <header className="w-dvw h-[80px] items-center bg-white flex justify-center z-50 fixed">
      <div className="w-[1280px] h-full flex flex-row items-center">
        <Link to={ROUTE_PATH.ROOT}>
          메인화면
        </Link>

        <div className="w-[80px]"></div>
        <nav className="flex justify-between h-[27px] w-[400px]">
          {menuItems.map((item, index) => (
            <Link to={item.href} key={index} className="text-[18px]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex-grow"/>
        <UserMenu/>
      </div>

    </header>
  )
}


function UserMenu() {
  const navigate = useNavigate();
  const {user, logout, error} = useUserState();
  function logoutButtonClick(){
    logout();
    secureLocalStorage.removeItem(ACCESS_TOKEN);
    secureLocalStorage.removeItem(REFRESH_TOKEN);
    navigate(ROUTE_PATH.ROOT);
  }


  if (!user || error != null) {
    return (
      <div>
        <Link to={ROUTE_PATH.LOGIN}>로그인</Link>
      </div>
    )
  }
  return (
    <div className="flex flex-row">
      <img
        className="w-8 h-8 rounded-full overflow-hidden"
        src={user.profileImageUrl}
        alt=""
      />
      <div className="w-4"/>
      <button onClick={logoutButtonClick}>
        로그아웃
      </button>
    </div>
  )
}