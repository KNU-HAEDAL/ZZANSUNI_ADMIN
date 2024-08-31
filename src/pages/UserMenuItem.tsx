import {UserInfoModel} from "@/api/user/user.response.ts";
import {ApiError} from "@/api/ApiError.ts";
import {Link, useNavigate} from "react-router-dom";
import {ROUTE_PATH} from "@/const/data.ts";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";

export interface UserMenuProps {
  user?: UserInfoModel;
  logout: () => Promise<void>;
  error: ApiError | null;
}

export function UserMenuItem({user, logout, error}: UserMenuProps) {
  const navigate = useNavigate();

  async function logoutButtonClick() {
    await logout();
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
      <UserDropMenu user={user}/>
      <div className="w-4"/>
      <button onClick={logoutButtonClick}>
        로그아웃
      </button>
    </div>
  )
}


function UserDropMenu({user}: {
  user: UserInfoModel;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <img
            className="w-8 h-8 rounded-full overflow-hidden"
            src={user.profileImageUrl === null ? '/logo.svg' : user.profileImageUrl}
            alt=""
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>유저정보</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          ID: {user.id}
        </DropdownMenuItem>
        <DropdownMenuItem>
          티어: {user.tierInfo.tier} {user.tierInfo.currentExp} / {user.tierInfo.totalExp}
        </DropdownMenuItem>
        <DropdownMenuItem>
          닉네임: {user.nickname}
        </DropdownMenuItem>
        <DropdownMenuItem>
          이메일: {user.email}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
