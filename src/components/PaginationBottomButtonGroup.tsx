import {calculateVisiblePages} from "@/util/paging.ts";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {useNavigate} from "react-router-dom";
import {useTransition} from "react";


export function PaginationBottomButtonGroup({ currentPage, size, totalPage, condition }: {
  currentPage: number,
  size: number,
  totalPage: number,
  condition: string[]
}) {
  const maxVisiblePages = 5;

  // 현재 페이지 주변의 표시할 페이지 번호 계산
  const { startPage, endPage } = calculateVisiblePages(currentPage, totalPage, maxVisiblePages);

  const prevPageBtnNumber = Math.max(currentPage - 1, 1);
  const nextPageBtnNumber = Math.min(currentPage + 1, totalPage);
  const navigate = useNavigate();

  const conditionQuery = condition.map((c) => `&${c}`).join('');

  const transition = useTransition()[1];

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href')!;
    transition(() =>
      navigate(href)
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?p=${prevPageBtnNumber}&s=${size}${conditionQuery}`}
            onClick={onLinkClick}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`?p=1&s=${size}${conditionQuery}`}
                onClick={onLinkClick}
              >1</PaginationLink>
            </PaginationItem>
            {startPage > 2 && <PaginationEllipsis />}
          </>
        )}

        {[...Array(endPage - startPage + 1)].map((_, i) => {
          const pageNum = startPage + i;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={`?p=${pageNum}&s=${size}${conditionQuery}`}
                onClick={onLinkClick}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {endPage < totalPage && (
          <>
            {endPage < totalPage - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                href={`?p=${totalPage}&s=${size}${conditionQuery}`}
                onClick={onLinkClick}
              >{totalPage}</PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={`?p=${nextPageBtnNumber}&s=${size}${conditionQuery}`}
            onClick={onLinkClick}
            aria-disabled={currentPage === totalPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}