/**
 * 페이징 계산 함수
 * 현재페이지와 전체 페이지 수, 최대 표시할 페이지 수를 받아서
 * 현재 페이지를 중심으로 최대 표시할 페이지 수만큼의 페이지 번호를 계산한다.
 */
export function calculateVisiblePages(current: number, total: number, maxVisible: number) {
  const halfVisible = Math.floor(maxVisible / 2);
  let startPage = Math.max(current - halfVisible, 1);
  const endPage = Math.min(startPage + maxVisible - 1, total);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(endPage - maxVisible + 1, 1);
  }

  return { startPage, endPage };
}