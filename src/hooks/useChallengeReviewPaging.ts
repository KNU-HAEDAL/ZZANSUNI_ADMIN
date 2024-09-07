import {ChallengeGroupPagingParams} from "@/api/challenge-group/challenge.group.request.ts";
import {useSearchParams} from "react-router-dom";
import {useSuspenseQuery} from "@tanstack/react-query";
import {PagingResponse} from "@/api/ApiResonpse.ts";
import {ApiError} from "@/api/ApiError.ts";
import {CHALLENGE_REVIEW} from "@/const/query.key.ts";
import {useEffect} from "react";
import {ChallengeReviewModel} from "@/api/challenge-review/challenge.review.response.ts";
import {getChallengeReviewPaging} from "@/api/challenge-review/challenge.review.api.ts";


interface ChallengeReviewPagingProps {
  page: number;
  size: number;
  content: ChallengeReviewModel[];
  totalPage: number;
}

export function useChallengeReviewPaging(): ChallengeReviewPagingProps {
  const [searchParams, setSearchParams] = useSearchParams();
  const pagingReq = {
    page: searchParams.get('p') ? parseInt(searchParams.get('p')!) : 1,
    size: searchParams.get('s') ? parseInt(searchParams.get('s')!) : 20,
  }

  const convertedPagingReq = {
    ...pagingReq,
    page: pagingReq.page - 1,
  }

  const {data: paingRes} = useSuspenseQuery<
    PagingResponse<ChallengeReviewModel>,
    ApiError,
    PagingResponse<ChallengeReviewModel>,
    [_0: string, _1: ChallengeGroupPagingParams]
  >({
    queryKey: [CHALLENGE_REVIEW, convertedPagingReq],
    queryFn: () => getChallengeReviewPaging(convertedPagingReq),
    staleTime: 1000 * 60 * 5
  });


  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (key === 'p') {
        if (parseInt(value) < 1) {
          alert('페이지는 1 이상이어야 합니다. 1로 초기화 합니다.');
          setSearchParams((prev) => {
            return {
              ...prev,
              p: '1'
            }
          }, {replace: true});
        }
      } else if (key === 's') {
        const size = parseInt(value);
        if (size < 1 || size > 100) {
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
    content: paingRes.data,
    totalPage: paingRes.totalPage,
  }
}
