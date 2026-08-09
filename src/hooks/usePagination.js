import { useState } from "react";

export const usePagination = (data, onPageChange) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(50);

  const setPageSize = (newPageSize) => {
    setPage(1);
    setPageSizeState(newPageSize);
  };

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const total = data.length;
  const totalPages = Math.ceil(total / pageSize);

  const safeStart = total === 0 ? 0 : start + 1;
  const safeEnd = Math.min(end, total);

  const currentData = data.slice(start, end);

  const changePage = (offset) => {
    onPageChange?.();

    const newPage = page + offset;
    const safePage = Math.max(1, Math.min(newPage, totalPages));

    setPage(safePage);
  };

  return {
    page,
    pageSize,
    setPageSize,
    setPage,
    start,
    currentData,
    total,
    totalPages,
    safeStart,
    safeEnd,
    changePage,
  };
};
