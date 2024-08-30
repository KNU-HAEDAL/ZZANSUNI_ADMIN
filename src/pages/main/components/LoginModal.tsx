import {ChangeEventHandler, FormEventHandler, useState} from "react";
import style from '../../../components/main/login.module.css';
import {Link, useNavigate} from "react-router-dom";
import BackButton from "../../../components/main/BackButton.tsx";
import secureLocalStorage from "react-secure-storage";
import {emailLogin} from "@/api/auth/auth.api.ts";
import {ApiError} from "@/api/ApiError.ts";
import {KAKAO_AUTH_URL, NAVER_AUTH_URL} from "@/const/data.ts";


export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const navigate = useNavigate();



  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await emailLogin({email, password});
      console.log('token', response);
      secureLocalStorage.setItem('accessToken', response.accessToken);
      secureLocalStorage.setItem('refreshToken', response.refreshToken);
      console.log('token', response);

      navigate('/dashboard');
    }
    catch (err) {
      console.error(err);
      if(err instanceof ApiError){
        setMessage(err.message)
      }else {
        setMessage('아이디와 비밀번호가 일치하지 않습니다.');
      }
    }
  };
  const onClickClose = () => {
    //홈으로 이동
    navigate('/');
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleModalClick = (e :React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 모달 바깥의 배경 클릭 시 모달을 닫는 처리 로직 추가
    const target = e.target as HTMLElement;
    if (target.classList.contains(style.modalBackground)) {
      onClickClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 내부의 요소 클릭 시 클릭 이벤트가 모달 바깥으로 전파되지 않도록 함
    e.stopPropagation();
  };





  return (
    <div className={style.modalBackground} onClick={handleModalClick}>
      <div className={style.modal} onClick={handleContentClick}>
        <div className={style.modalHeader}>
          <BackButton onClickClose={onClickClose}/>
          <div>로그인</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">아이디</label>
              <input id="id" className={style.input} value={email} onChange={onChangeId} type="text" placeholder=""
                     required/>
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">비밀번호</label>
              <input id="password" className={style.input} value={password} onChange={onChangePassword} type="password" placeholder=""
                     required/>
            </div>
          </div>
          <div className={style.message}>{message}</div>

          <div className="flex flex-row w-full justify-center">
            <Link to={`${KAKAO_AUTH_URL}`} className="">
              카카오 로그인
            </Link>
            <div className="w-4"/>
            <Link to={`${NAVER_AUTH_URL}`} className="">
              네이버 로그인
            </Link>
          </div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!email && !password}>로그인하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}