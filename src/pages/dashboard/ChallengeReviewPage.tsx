import {ErrorBoundary} from "react-error-boundary";
import {Suspense, useEffect} from "react";
import {PaginationBottomButtonGroup} from "@/components/PaginationBottomButtonGroup.tsx";
import ChallengeReviewTable from "@/pages/dashboard/component/ChallengeReviewTable.tsx";
import {useChallengeReviewPaging} from "@/hooks/useChallengeReviewPaging.ts";

export function ChallengeReviewPage() {
  const {content, size, page, totalPage} = useChallengeReviewPaging();

  useEffect(() => {
    //위로 스크롤 이동
    window.scrollTo(0, 0);
  }, [page, size]);

  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense fallback={"loading.."}>
        <div className="w-full h-full">
          <div className="font-normal px-4 pb-4 text-[18px]">
            챌린지 리뷰 목록
          </div>
          <ChallengeReviewTable challengeReviews={content ?? []}/>
          <PaginationBottomButtonGroup
            currentPage={page}
            size={size}
            totalPage={totalPage ?? 1}
            condition={[]}
          />
          <div className="h-4"/>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}