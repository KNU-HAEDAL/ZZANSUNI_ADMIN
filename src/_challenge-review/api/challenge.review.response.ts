import {UserInfoModel} from "@/_user/api/user.response.ts";

export interface ChallengeReviewModel{
  challengeId: number;
  challengeTitle: string;
  user: UserInfoModel;
  content: string;
  rating: number;
}
