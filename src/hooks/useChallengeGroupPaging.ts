import {Category, ChallengeGroupPagingParams} from "@/api/challenge-group/challenge.group.request.ts";
import {useLocation} from "react-router-dom";
import {ChallengeGroupModel} from "@/api/challenge-group/challenge.group.response.ts";
import {useQuery} from "@tanstack/react-query";
import {PagingResponse} from "@/api/ApiResonpse.ts";
import {ApiError} from "@/api/ApiError.ts";
import {CHALLENGE_GROUP} from "@/const/query.key.ts";
import {getChallengeGroupPagingFn} from "@/api/challenge-group/challenge.group.api.ts";

function usePageParams(): ChallengeGroupPagingParams {
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('p') ? parseInt(searchParams.get('p')!) : 1;
  const size = searchParams.get('s') ? parseInt(searchParams.get('s')!) : 20;
  const category = searchParams.get('c') as Category ?? undefined;
  return {
    page,
    size,
    category
  }
}

interface ChallengeGroupPagingProps {
  page: number;
  size: number;
  category?: Category;
  content?: ChallengeGroupModel[];
  totalPage?: number;
  isLoading: boolean;
}

export function useChallengeGroupPaging(): ChallengeGroupPagingProps {
  const pagingReq = usePageParams();
  const convertedPagingReq = {
    ...pagingReq,
    page: pagingReq.page - 1,
  }

  const {data, isLoading} = useQuery<
    PagingResponse<ChallengeGroupModel>,
    ApiError,
    PagingResponse<ChallengeGroupModel>,
    [_0: string, _1: ChallengeGroupPagingParams]
  >({
    queryKey: [CHALLENGE_GROUP, convertedPagingReq],
    queryFn: getChallengeGroupPagingFn,
  });

  return {
    page: pagingReq.page,
    size: pagingReq.size,
    category: pagingReq.category,
    content: data?.data,
    totalPage: data?.totalPage,
    isLoading,
  }
}
