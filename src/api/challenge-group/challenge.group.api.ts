import {
  ChallengeGroupPagingParams,
  CreateChallengeGroupRequest
} from "@/api/challenge-group/challenge.group.request.ts";
import {axiosClient} from "@/api/AxiosClient.ts";
import {PagingResponse} from "@/api/ApiResonpse.ts";
import {ChallengeGroupModel} from "@/api/challenge-group/challenge.group.response.ts";

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