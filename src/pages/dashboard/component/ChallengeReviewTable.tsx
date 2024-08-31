import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ChallengeReviewModel} from "@/api/challenge-review/challenge.review.response.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

interface ChallengeReviewTableProps {
  challengeReviews: ChallengeReviewModel[];
}

export default function ChallengeReviewTable({challengeReviews}: ChallengeReviewTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[90px]">챌린지 ID</TableHead>
          <TableHead>챌린지 제목</TableHead>
          <TableHead>내용</TableHead>
          <TableHead>별점</TableHead>
          <TableHead>닉네임</TableHead>


          <TableHead className="w-[90px]">액션</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          challengeReviews.map((challengeReview,index) => (
            <ChallengeReviewItem key={index} challengeReview={challengeReview}/>
          ))
        }
      </TableBody>
    </Table>
  )
}

function ChallengeReviewItem({challengeReview}: { challengeReview: ChallengeReviewModel }) {
  const handleEdit = () => {
    console.log('edit')
  }
  const handleDelete = () => {
    console.log('delete')
  }

  return (
    <TableRow>
      <TableCell>{challengeReview.challengeId}</TableCell>
      <TableCell>{challengeReview.challengeTitle}</TableCell>
      <TableCell>{challengeReview.content}</TableCell>
      <TableCell>{challengeReview.rating}</TableCell>
      <TableCell>{challengeReview.user.nickname}</TableCell>

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
