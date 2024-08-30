import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserState} from "@/hooks/userState.ts";
import {API_BASE_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL} from "@/const/data.ts";
import {ApiError} from "@/api/ApiError.ts";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const navigate = useNavigate();


  const {login} = useUserState();

  const onLoginClick = async () => {
    setMessage('');
    if(!email || !password) {
      setMessage('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    try {
      console.log(`${API_BASE_URL} is api`)
      await login({email, password});

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err instanceof ApiError) {
        setMessage(err.message)
      } else {
        setMessage('아이디와 비밀번호가 일치하지 않습니다.');
      }
    }
  };
  return (
    <div className="flex flex-col items-center h-[calc(100vh-80px)]">
      <div className="h-[20px]"/>
      <div className="font-bold text-[24px]">
        로그인
      </div>
      <div className="h-[40px]"/>
      <EmailLoginBox
        onLoginClick={onLoginClick}
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />

      <div className="text-[#ff0000] py-4">{message}</div>

      <div className="font-medium text-[14px] text-[#DEDEDE] my-[28px]">
        —————————— SNS 계정으로 로그인 ——————————
      </div>

      <div className="w-[380px] h-[48px] border-[#DEDEDE] border-[1px] rounded-[12px]">
        <a href={KAKAO_AUTH_URL}>
          <div
            className="font-normal text-[#818182] text-[14px]
            h-full w-full justify-center items-center flex"
          >
            카카오 게정으로 로그인
          </div>

        </a>

      </div>
      <div className="w-[380px] h-[48px] border-[#DEDEDE] border-[1px] rounded-[12px] mt-2">
        <a href={NAVER_AUTH_URL}>
          <div
            className="font-normal text-[#818182] text-[14px]
            h-full w-full justify-center items-center flex"
          >
            네이버 게정으로 로그인
          </div>
        </a>
      </div>
    </div>
  );
}


interface EmailLoginBoxProps {
  onLoginClick: () => void;
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
}

function EmailLoginBox({
                         onLoginClick, onPasswordChange, onEmailChange, email, password
                       }: EmailLoginBoxProps){
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      onLoginClick();
    }
  }
  return (
    <div className="flex flex-col">
      <input
        className="border-[#DEDEDE] border-[1px] w-[380px] h-[52px] rounded-[12px] px-[16px] mb-[12px]"
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input
        className="border-[#DEDEDE] border-[1px] w-[380px] h-[52px] rounded-[12px] px-[16px] mb-[16px]"
        type="password"
        placeholder="비밀번호"
        onChange={(e) => onPasswordChange(e.target.value)}
        value={password}
        onKeyDown={onKeyDown}
      />
      <div className="flex flex-row items-stretch">
        <div className="flex-[1]" />
        <div className="font-medium text-[13px] text-[#A2A2A3] mb-[32px]">
          비밀번호 찾기
        </div>
      </div>
      <button
        className="bg-gray-400 text-white rounded-[12px] w-[380px] h-[54px] border-white"
        onClick={()=> onLoginClick()}
      >
        <div className="font-medium text-[16px]">
          로그인
        </div>
      </button>
    </div>
  );
}