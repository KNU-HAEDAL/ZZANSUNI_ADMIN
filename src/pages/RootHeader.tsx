import {Link, useNavigate} from "react-router-dom";
import {useUserState} from "@/hooks/userState.ts"
import {ROUTE_PATH} from "@/const/data.ts";
import {UserInfoModel} from "@/api/user/user.response.ts";
import {UserMenuItem} from "@/pages/UserMenuItem.tsx";

const menuItems = [
  {label: '대시보드', href: ROUTE_PATH.DASHBOARD_HOME},
  {label: '챌린지 그룹', href: ROUTE_PATH.DASHBOARD_CHALLENGE_GROUP},
  {label: '챌린지 리뷰', href: ROUTE_PATH.DASHBOARD_CHALLENGE_REVIEW},
  {label: '계정 관리', href: ROUTE_PATH.DASHBOARD_MANAGE_ACCOUNT},
  {label: '마이페이지', href: ROUTE_PATH.DASHBOARD_MY},
]


export default function RootHeader() {
  const {user, logout, error} = useUserState();
  const navigate = useNavigate();

  const clickedWhenNotLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('로그인이 필요한 서비스입니다.');
    navigate(ROUTE_PATH.LOGIN);
  }


  return (
    <header className="w-dvw h-[80px] items-center bg-white flex justify-center z-50 fixed">
      <div className="w-[1280px] h-full flex flex-row items-center">
        <Link to={ROUTE_PATH.ROOT}>
          메인화면
        </Link>

        <div className="w-[80px]"></div>
        <nav className="flex justify-between h-[27px] w-[500px]">
          {menuItems.map((item, index) => (
            <MenuLink key={index} user={user} item={item} index={index} clickedWhenNotLogin={clickedWhenNotLogin}/>
          ))}
        </nav>
        <div className="flex-grow"/>
        <UserMenuItem user={user} error={error} logout={logout}/>
      </div>
    </header>
  )
}

interface MenuLinkProps {
  user?: UserInfoModel;
  item: { label: string, href: string };
  index: number;
  clickedWhenNotLogin: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function MenuLink({user, item, index, clickedWhenNotLogin}: MenuLinkProps) {
  return (
    user ?
      <Link to={item.href} key={index} className="text-[18px]">
        {item.label}
      </Link>
      :
      <Link to={item.href} key={index} className="text-[18px]"
            onClick={clickedWhenNotLogin}
      >
        {item.label}
      </Link>
  )
}
