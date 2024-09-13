export interface UserInfoModel {
  id: number;
  nickname: string;
  profileImageUrl: string;
  email: string;
  tierInfo: TierInfoModel;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export interface TierInfoModel {
  tier: string;
  totalExp: number;
  currentExp: number;
}