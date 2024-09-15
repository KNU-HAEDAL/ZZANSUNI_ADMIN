import {ErrorBoundary} from "react-error-boundary";
import {Suspense, useEffect} from "react";
import {PaginationBottomButtonGroup} from "@/components/PaginationBottomButtonGroup.tsx";
import ChallengeReviewTable from "@/_challenge-review/components/ChallengeReviewTable.tsx";
import {useChallengeReviewPaging} from "@/_challenge-review/hooks/useChallengeReviewPaging.ts";
import DelayedLoadingSpinner from "@/components/DelayedLoadingSpinner.tsx";

export function ChallengeReviewPage() {

  return (
    <div className="w-full h-full">
      <div className="font-normal px-4 pb-4 text-[18px]">
        챌린지 리뷰 목록
      </div>
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense fallback={<DelayedLoadingSpinner/>}>
          <ReviewInnerContent/>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function ReviewInnerContent() {
  const {content, size, page, totalPage} = useChallengeReviewPaging();

  useEffect(() => {
    //위로 스크롤 이동
    window.scrollTo(0, 0);
  }, [page, size]);

  return (
    <>
      <ChallengeReviewTable challengeReviews={content}/>
      <PaginationBottomButtonGroup
        currentPage={page}
        size={size}
        totalPage={totalPage}
        condition={[]}
      />
      <div className="h-4"/>
    </>
  );
}