import {PagingRequest, PagingResponse} from "@/global/api/ApiResonpse.ts";
import {axiosClient} from "@/global/api/AxiosClient.ts";
import {ChallengeReviewModel} from "@/_challenge-review/api/challenge.review.response.ts";

export async function getChallengeReviewPaging(params: PagingRequest): Promise<PagingResponse<ChallengeReviewModel>> {
  const res = await axiosClient.get('/api/challengeGroups/reviews', {params});
  return res.data;
}