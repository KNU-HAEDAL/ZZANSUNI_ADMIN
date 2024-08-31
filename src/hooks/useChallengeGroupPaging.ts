import {Category, ChallengeGroupPagingParams} from "@/api/challenge-group/challenge.group.request.ts";
import {useSearchParams} from "react-router-dom";
import {ChallengeGroupModel} from "@/api/challenge-group/challenge.group.response.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import {PagingResponse} from "@/api/ApiResonpse.ts";
import {ApiError} from "@/api/ApiError.ts";
import {CHALLENGE_GROUP} from "@/const/query.key.ts";
import {getChallengeGroupPagingFn} from "@/api/challenge-group/challenge.group.api.ts";
import {useEffect} from "react";


interface ChallengeGroupPagingProps {
  page: number;
  size: number;
  category?: Category;
  content?: ChallengeGroupModel[];
  totalPage?: number;
  isLoading: boolean;
}

export function useChallengeGroupPaging(): ChallengeGroupPagingProps {
  const [searchParams, setSearchParams] = useSearchParams();
  const pagingReq=  {
    page: searchParams.get('p') ? parseInt(searchParams.get('p')!) : 1,
    size: searchParams.get('s') ? parseInt(searchParams.get('s')!) : 20,
    category: searchParams.get('c') as Category ?? undefined,
  }

  const convertedPagingReq = {
    ...pagingReq,
    page: pagingReq.page - 1,
  }

  const {data, isLoading} = useSuspenseQuery<
    PagingResponse<ChallengeGroupModel>,
    ApiError,
    PagingResponse<ChallengeGroupModel>,
    [_0: string, _1: ChallengeGroupPagingParams]
  >({
    queryKey: [CHALLENGE_GROUP, convertedPagingReq],
    queryFn: getChallengeGroupPagingFn,
    staleTime: 1000 * 60 * 5
  });


  useEffect(() => {
    searchParams.forEach((value, key) => {
      if(key === 'c') {
        if(!['HEALTH', 'ECHO', 'SHARE', 'VOLUNTEER', 'ETC'].includes(value)){
          alert('존재하지 않는 카테고리입니다. 전체로 초기화 합니다.');
          setSearchParams((prev) => {
            return {
              p: prev.get('p') ?? '1',
              s: prev.get('s') ?? '20',
            }
          }, {replace: true});
        }
      }else if(key === 'p') {
        if(parseInt(value) < 1){
          alert('페이지는 1 이상이어야 합니다. 1로 초기화 합니다.');
          setSearchParams((prev) => {
            return {
              ...prev,
              p: '1'
            }
          }, {replace: true});
        }
      }else if(key === 's') {
        const size = parseInt(value);
        if(size < 1 || size > 100){
          alert('페이지 크기는 1~100 사이여야 합니다. 20으로 초기화 합니다.');
          setSearchParams((prev) => {
            return {
              ...prev,
              s: '20'
            }
          }, {replace: true});
        }
      }
    });
  }, [searchParams]);

  return {
    page: pagingReq.page,
    size: pagingReq.size,
    category: pagingReq.category,
    content: data?.data,
    totalPage: data?.totalPage,
    isLoading,
  }
}
