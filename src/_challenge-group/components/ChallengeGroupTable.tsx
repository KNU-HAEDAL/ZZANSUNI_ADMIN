import {ChallengeGroupModel} from "@/_challenge-group/api/challenge.group.response.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";

export function ChallengeGroupTable({challengeGroups}: {challengeGroups: ChallengeGroupModel[]}){
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead className="w-[220px]">제목</TableHead>
          <TableHead>내용</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead className="w-[115px]">시작일</TableHead>
          <TableHead className="w-[115px]">종료일</TableHead>
          <TableHead className="w-[90px]">참여자 수</TableHead>

          <TableHead className="w-[90px]">편집</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          challengeGroups.map((challengeGroup) => (
            <ChallengeGroupItem key={challengeGroup.id} challengeGroup={challengeGroup}/>
          ))
        }
      </TableBody>
    </Table>
  )
}


function ChallengeGroupItem({challengeGroup}: {
  challengeGroup: ChallengeGroupModel
}){
  const handleEdit = () => {
    console.log('edit')
  }
  const handleDelete = () => {
    console.log('delete')
  }

  return (
    <TableRow>
      <TableCell>{challengeGroup.id}</TableCell>
      <TableCell>{challengeGroup.title}</TableCell>
      <TableCell>{challengeGroup.content}</TableCell>
      <TableCell>{challengeGroup.category}</TableCell>
      <TableCell>{challengeGroup.startDate}</TableCell>
      <TableCell>{challengeGroup.endDate}</TableCell>
      <TableCell>{challengeGroup.participantCount}</TableCell>

      <TableCell>
        <EditMenu handleEdit={handleEdit} handleDelete={handleDelete}/>
      </TableCell>
    </TableRow>
  );
}

function EditMenu({handleEdit, handleDelete}: {
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEdit}>
          편집
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
