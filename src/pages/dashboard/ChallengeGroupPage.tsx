import {useQuery} from "@tanstack/react-query";
import {getChallengeGroupPagingFn} from "@/api/challenge-group/challenge.group.api.ts";
import {PagingResponse} from "@/api/ApiResonpse.ts";
import {ChallengeGroupModel} from "@/api/challenge-group/challenge.group.response.ts";
import {Category, ChallengeGroupPagingParams} from "@/api/challenge-group/challenge.group.request.ts";
import {ApiError} from "@/api/ApiError.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {CHALLENGE_GROUP} from "@/const/query.key.ts";
import {PaginationBottomButtonGroup} from "@/components/PaginationBottomButtonGroup.tsx";
import {useState} from "react";
import {SelectCategory} from "@/pages/dashboard/component/SelectCategory.tsx";
import {ChallengeGroupTable} from "@/pages/dashboard/component/ChallengeGroupTable.tsx";


function usePageParams(): ChallengeGroupPagingParams{
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
function useChallengeGroupPaging() :ChallengeGroupPagingProps{
  const pagingReq = usePageParams();
  const convertedPagingReq = {
    ...pagingReq,
    page: pagingReq.page-1,
  }

  const {data, isLoading} =  useQuery<
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



export default function ChallengeGroupPage() {
  const { content, totalPage, page, size, category} = useChallengeGroupPaging();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(category);
  const location = useLocation();
  const navigate = useNavigate();

  function handleCategoryChange(category?: string) {
    setSelectedCategory(category);
    const searchParams = new URLSearchParams(location.search);

    if (category && category !== 'ALL') {
      searchParams.set('c', category);
      searchParams.set('p', '1');
    } else {
      searchParams.delete('c');
    }
    navigate({search: searchParams.toString()}, {replace: true});
  }
  const condition = (selectedCategory && selectedCategory !== 'ALL') ? [`c=${selectedCategory}`] : [];

  return (
    <div className="w-full h-full">
      <div className="font-normal px-4 pb-4 text-[18px]">
        챌린지 그룹 목록
      </div>
      <div className="w-[300px] px-4">
        <SelectCategory selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange}/>
      </div>
      <ChallengeGroupTable challengeGroups={content ?? []}/>
      <div>
        <PaginationBottomButtonGroup
          currentPage={page}
          size={size}
          totalPage = {totalPage ?? 1}
          condition={condition}
        />
      </div>
    </div>
  );
}
