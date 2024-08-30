import {useQuery} from "@tanstack/react-query";
import {getChallengeGroupPagingFn} from "@/api/challenge-group/challenge.group.api.ts";
import {PagingResponse} from "@/api/ApiResonpse.ts";
import {ChallengeGroupModel} from "@/api/challenge-group/challenge.group.response.ts";
import {Category, ChallengeGroupPagingParams} from "@/api/challenge-group/challenge.group.request.ts";
import {ApiError} from "@/api/ApiError.ts";
import {useLocation} from "react-router-dom";
import {CHALLENGE_GROUP} from "@/const/query.key.ts";

export default function ChallengeGroupPage() {
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('p') ? parseInt(searchParams.get('p')!) : 0;
  const size = searchParams.get('s') ? parseInt(searchParams.get('s')!) : 20;
  const category = searchParams.get('c') as Category || 'HEALTH';

  const pagingReq: ChallengeGroupPagingParams = {
    page,
    size,
    category,
  }

  const {data} = useQuery<
    PagingResponse<ChallengeGroupModel>,
    ApiError,
    PagingResponse<ChallengeGroupModel>,
    [_0: string, _1: ChallengeGroupPagingParams]
  >({
    queryKey: [CHALLENGE_GROUP, pagingReq],
    queryFn: getChallengeGroupPagingFn,
  });


  return (
    <div className="w-full h-full">
      <div>
        챌린지 그룹
      </div>
      <div>

        {
          data?.data.map((challengeGroup) => (
            <div key={challengeGroup.id}>
              <ChallengeGroupItem challengeGroup={challengeGroup}/>
            </div>
          ))
        }
      </div>
    </div>
  );
}

const ChallengeGroupItem = ({challengeGroup}: {
  challengeGroup: ChallengeGroupModel
}) => {
  return (
    <div className="flex flex-row border m-4">
      <div>
        id: {challengeGroup.id}
      </div>
      <div>
        제목 :{challengeGroup.title}
      </div>
      <div className="border w-5/6">
        내용 :{challengeGroup.content}
      </div>
      <div>
        카테고리 :{challengeGroup.category}
      </div>
      <div>
        {challengeGroup.startDate}
      </div>
      <div>
        {challengeGroup.endDate}
      </div>
      <div>
        {challengeGroup.participantCount}
      </div>
    </div>
  );
}