import {
  ChallengeGroupPagingParams,
  CreateChallengeGroupRequest
} from "@/api/challenge-group/challenge.group.request.ts";
import {axiosClient} from "@/api/AxiosClient.ts";
import {PagingResponse} from "@/api/ApiResonpse.ts";
import {ChallengeGroupModel} from "@/api/challenge-group/challenge.group.response.ts";
import {QueryFunction} from "@tanstack/react-query";

export async function createChallengeGroup(req: CreateChallengeGroupRequest): Promise<void> {
  await axiosClient.post('/api/challenge-group', req);
  return;
}


/**
 * 챌린지 페이징 조회 React Query 함수
 * 기존 getChallengeGroupPaging 함수를 React Query 함수로 래핑
 */
export const getChallengeGroupPagingFn: QueryFunction<
  PagingResponse<ChallengeGroupModel>,
  [_0: string, ChallengeGroupPagingParams]
> = async ({queryKey}) => {
  const req = queryKey[1];
  return await getChallengeGroupPaging(req);
}

export async function getChallengeGroupPaging(params: ChallengeGroupPagingParams): Promise<PagingResponse<ChallengeGroupModel>> {
  const res = await axiosClient.get('/api/challengeGroups',
    {
      params: {
        ...params
      }
    });
  return res.data;
}