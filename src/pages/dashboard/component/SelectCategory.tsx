import {Category} from "@/api/challenge-group/challenge.group.request.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

export function SelectCategory({
                          selectedCategory,
                          setSelectedCategory,
                        }: {
  selectedCategory?: string;
  setSelectedCategory: (category?: string) => void;
}) {
  const categories: Category[] = ['HEALTH', 'ECHO', 'SHARE', 'VOLUNTEER', 'ETC'];
  console.log('selectedCategory', selectedCategory)
  const handleValueChange = (value: string) => {
    setSelectedCategory(value);
  }

  return (
    <Select value={selectedCategory} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="카테고리 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'ALL'}>
          {'전체'}
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