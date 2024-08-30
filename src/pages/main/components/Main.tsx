import {Link, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {UserInfoModel} from "@/api/user/user.response.ts";
import {ApiError} from "@/api/ApiError.ts";
import {getUserInfo} from "@/api/user/user.api.ts";

export default function Main() {

  const {data} = useQuery<UserInfoModel, ApiError>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  const navigate = useNavigate();

  const onDashboardClick = () => {
    if (data) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }
  const header = 'ZZANSUNI ADMIN';
  const title = 'ZZANSUNI ADMIN';
  const content = 'MANAGE OUR DATA BY REACT';

  return (
    <main className="flex flex-col w-screen h-screen bg-bgGrey items-center">
      <div className="w-screen h-16 bg-bgGrey
      px-64 flex flex-row items-center border-b border-gray-700">
        <div className="text-base text-gray-50">
          {header}
        </div>
        <div className="flex-1"></div>
        <div className="flex flex-row justify-end items-center">


          <button onClick={onDashboardClick}
                  className="h-7 mr-4 text-white text-[12px] font-light px-2.5 py-0.5
                  border border-buttonGreenBorder rounded-[6px]
                  hover:text-white hover:bg-[#38996b]/80 bg-buttonGreen">
            대시보드
          </button>
          {!data &&
              <Link to={'/login'}
                    className="h-8 flex items-center justify-center mr-4 text-white text-[12px] font-light
                    px-2.5 py-0.5 border border-gray-300 rounded hover:bg-gray-400 hover:text-black">
                  <div>로그인</div>
              </Link>
          }

        </div>
      </div>
      <div className="mt-48 flex flex-col items-center text-5xl font-semibold">
        <div className="block text-[#F4FFFA00] bg-clip-text bg-gradient-to-b
        from-[#cccccc] via-[#cccccc] to-[#ffffff]">
          {title}
        </div>
        <div className="text-transparent bg-clip-text
        bg-gradient-to-br from-[#3ECF8E] via-[#3ECF8E] to-[#3ecfb2] block md:ml-0">
          {content}
        </div>
      </div>

    </main>
  );
}