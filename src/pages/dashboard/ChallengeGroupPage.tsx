import {useLocation, useNavigate} from "react-router-dom";
import {PaginationBottomButtonGroup} from "@/components/PaginationBottomButtonGroup.tsx";
import {useState} from "react";
import {CategorySelector} from "@/pages/dashboard/component/CategorySelector.tsx";
import {ChallengeGroupTable} from "@/pages/dashboard/component/ChallengeGroupTable.tsx";
import {useChallengeGroupPaging} from "@/hooks/useChallengeGroupPaging.ts";


export default function ChallengeGroupPage() {
  const {content, totalPage, page, size, category} = useChallengeGroupPaging();
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
        <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange}/>
      </div>
      <ChallengeGroupTable challengeGroups={content ?? []}/>
      <div>
        <PaginationBottomButtonGroup
          currentPage={page}
          size={size}
          totalPage={totalPage ?? 1}
          condition={condition}
        />
      </div>
    </div>
  );
}
