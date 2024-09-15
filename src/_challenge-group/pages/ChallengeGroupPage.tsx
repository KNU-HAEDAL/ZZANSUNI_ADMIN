import {PaginationBottomButtonGroup} from "@/components/PaginationBottomButtonGroup.tsx";
import {CategorySelector} from "@/_challenge-group/components/CategorySelector.tsx";
import {ChallengeGroupTable} from "@/_challenge-group/components/ChallengeGroupTable.tsx";
import {useChallengeGroupPaging} from "@/_challenge-group/hooks/useChallengeGroupPaging.ts";
import {Suspense, useEffect} from "react";
import {ErrorBoundary} from "react-error-boundary";
import DelayedLoadingSpinner from "@/components/DelayedLoadingSpinner.tsx";


export default function ChallengeGroupPage() {


  return (
    <div className="w-full h-full">
      <div className="font-normal px-4 pb-4 text-[18px]">
        챌린지 그룹 목록
      </div>
      <div className="w-[300px] px-4">
        <CategorySelector/>
      </div>
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense fallback={<DelayedLoadingSpinner/>}>
          <ChallengeGroupInnerContent/>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}


function ChallengeGroupInnerContent() {
  const {content, totalPage, page, size, category} = useChallengeGroupPaging();


  const condition = (category !== undefined) ? [`c=${category}`] : [];
  useEffect(() => {
    //위로 스크롤 이동
    window.scrollTo(0, 0);
  }, [page, size, category]);

  return (
    <>
      <ChallengeGroupTable challengeGroups={content}/>
      <PaginationBottomButtonGroup
        currentPage={page}
        size={size}
        totalPage={totalPage}
        condition={condition}
      />
      <div className="h-4"/>
    </>
  );
}