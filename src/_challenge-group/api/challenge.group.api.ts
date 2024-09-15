import {
  ChallengeGroupPagingParams,
  CreateChallengeGroupRequest
} from "@/_challenge-group/api/challenge.group.request.ts";
import {axiosClient} from "@/global/api/AxiosClient.ts";
import {PagingResponse} from "@/global/api/ApiResonpse.ts";
import {ChallengeGroupModel} from "@/_challenge-group/api/challenge.group.response.ts";

export async function createChallengeGroup(req: CreateChallengeGroupRequest): Promise<void> {
  await axiosClient.post('/api/challenge-group', req);
  return;
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