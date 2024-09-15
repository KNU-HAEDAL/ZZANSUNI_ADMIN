export interface EmailLoginRequest {
  email: string;
  password: string;
}

export interface OAuthLoginRequest {
  code: string;
  provider: 'KAKAO' | 'NAVER';
  state?: string;
}

export interface CreateManagerRequest {
  email: string;
  password: string;
  nickname: string;
}