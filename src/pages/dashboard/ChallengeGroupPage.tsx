import {PaginationBottomButtonGroup} from "@/components/PaginationBottomButtonGroup.tsx";
import {CategorySelector} from "@/pages/dashboard/component/CategorySelector.tsx";
import {ChallengeGroupTable} from "@/pages/dashboard/component/ChallengeGroupTable.tsx";
import {useChallengeGroupPaging} from "@/hooks/useChallengeGroupPaging.ts";
import {Suspense, useEffect} from "react";
import {ErrorBoundary} from "react-error-boundary";


export default function ChallengeGroupPage() {
  const {content, totalPage, page, size, category} = useChallengeGroupPaging();


  const condition = (category !== undefined) ? [`c=${category}`] : [];
  useEffect(() => {
    //위로 스크롤 이동
    window.scrollTo(0, 0);
  }, [page, size, category]);



  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense fallback={"loading.."}>
        <div className="w-full h-full">
          <div className="font-normal px-4 pb-4 text-[18px]">
            챌린지 그룹 목록
          </div>
          <div className="w-[300px] px-4">
            <CategorySelector/>
          </div>
          <ChallengeGroupTable challengeGroups={content ?? []}/>
          <PaginationBottomButtonGroup
            currentPage={page}
            size={size}
            totalPage={totalPage ?? 1}
            condition={condition}
          />
          <div className="h-4"/>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
