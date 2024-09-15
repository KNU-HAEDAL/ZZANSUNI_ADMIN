import {Category} from "@/_challenge-group/api/challenge.group.request.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useSearchParams} from "react-router-dom";

export function CategorySelector() {
  const categories: Category[] = ['HEALTH', 'ECHO', 'SHARE', 'VOLUNTEER', 'ETC'];
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('c') ?? 'ALL';

  const handleValueChange = (value: string) => {
    if (value !== 'ALL') {
      setSearchParams((prev) => {
        return {
          ...prev,
          c: value,
          p: '1',
        }
      });
    } else {
      setSearchParams((prev) => {
        return {
          p: prev.get('p') ?? '1',
          s: prev.get('s') ?? '20',
        }
      });
    }
  }


  return (
    <Select value={currentCategory} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="카테고리 선택"/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'ALL'}>
          전체
        </SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}