import {PagingRequest, PagingResponse} from "@/api/ApiResonpse.ts";
import {ChallengeReviewModel} from "@/api/challenge-review/challenge.review.response.ts";
import {axiosClient} from "@/api/AxiosClient.ts";

export async function getChallengeReviewPaging(params: PagingRequest): Promise<PagingResponse<ChallengeReviewModel>> {
  const res = await axiosClient.get('/api/challengeGroups/reviews', {params});
  return res.data;
}