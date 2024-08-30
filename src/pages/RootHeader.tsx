import {Link, useNavigate} from "react-router-dom";
import {useUserState} from "@/hooks/userState.ts";
import secureLocalStorage from "react-secure-storage";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/const/data.ts";

const menuItems = [
  {label: '홈', href: '/dashboard'},
  {label: '챌린지 그룹', href: '/dashboard/challenge-group'},
  {label: '챌린지 리뷰', href: '/dashboard/challenge-group'},
  {label: '마이페이지', href: '/dashboard/my'},
]

export const RootHeaderHeight = '80px';

export default function RootHeader() {
  return (
    <header className="w-dvw h-[80px] items-center bg-white flex justify-center z-50 fixed">
      <div className="w-[1280px] h-full flex flex-row items-center">
        <Link to={'/'}>
          메인화면
        </Link>

        <div className="w-[80px]"></div>
        <nav className="flex justify-between h-[27px] w-[379px]">
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
    navigate('/');
  }


  if (!user || error != null) {
    return (
      <div>
        <Link to="/login">로그인</Link>
      </div>
    )
  }
  return (
    <div>
      <img className="w-8 h-8 rounded-full overflow-hidden" src={user.profileImageUrl} alt=""/>
      <button onClick={logoutButtonClick}>
        로그아웃
      </button>
    </div>
  )
}