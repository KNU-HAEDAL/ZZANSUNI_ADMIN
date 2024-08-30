export interface UserInfoModel {
  id: number;
  nickname: string;
  profileImageUrl: string;
  email: string;
  tierInfo: TierInfoModel;
}

export interface TierInfoModel {
  tier: string;
  totalExp: number;
  currentExp: number;
}