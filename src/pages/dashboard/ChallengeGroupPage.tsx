import {PaginationBottomButtonGroup} from "@/components/PaginationBottomButtonGroup.tsx";
import {CategorySelector} from "@/pages/dashboard/component/CategorySelector.tsx";
import {ChallengeGroupTable} from "@/pages/dashboard/component/ChallengeGroupTable.tsx";
import {useChallengeGroupPaging} from "@/hooks/useChallengeGroupPaging.ts";
import {useQueryClient} from "@tanstack/react-query";
import {getChallengeGroupPaging} from "@/api/challenge-group/challenge.group.api.ts";
import {Category} from "@/api/challenge-group/challenge.group.request.ts";
import {CHALLENGE_GROUP} from "@/const/query.key.ts";
import {Suspense, useEffect} from "react";
import {ErrorBoundary} from "react-error-boundary";


export default function ChallengeGroupPage() {
  const {content, totalPage, page, size, category} = useChallengeGroupPaging();


  const condition = (category !== undefined) ? [`c=${category}`] : [];
  useEffect(() => {
    //위로 스크롤 이동
    window.scrollTo(0, 0);
  }, [page, size, category]);

  const queryClient = useQueryClient();

  const prefetchFn = async (href: string) => {
    const searchParams = new URLSearchParams(href);
    const page = Number(searchParams.get('p'));
    const size = Number(searchParams.get('s'));
    const category = searchParams.get('c') as Category | undefined;
    const qKey = {
      page: page - 1,
      size,
      category: category ?? undefined
    }
    await queryClient.prefetchQuery({
      queryKey: [CHALLENGE_GROUP, qKey],
      queryFn: () => {
        return getChallengeGroupPaging({
          page: page - 1,
          size: size,
          category: category ?? undefined
        });
      },
      staleTime: 1000 * 60 * 5
    });
  }

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
            prefetchFn={prefetchFn}
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
