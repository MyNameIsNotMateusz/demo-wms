import {
  PaginationWrapper,
  PaginationControls,
  PaginationInfo,
  PaginationRange,
  PaginationTotal,
  PaginationButtons,
  PageButton,
  PaginationPageSize,
  PageSizeSelect,
} from "./TablePagination.styles";

export const TablePagination = ({
  changePage,
  safeStart,
  safeEnd,
  total,
  page,
  totalPages,
  setPageSize,
  pageSize
}) => {
  return (
    <PaginationWrapper>
      <PaginationControls>
        <PaginationInfo>
          <PaginationRange>
            {safeStart}-{safeEnd}
          </PaginationRange>
          <PaginationTotal> of {total}</PaginationTotal>
        </PaginationInfo>
        <PaginationPageSize>
          <PageSizeSelect value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </PageSizeSelect>
        </PaginationPageSize>
        <PaginationButtons>
          <PageButton onClick={() => changePage(-1)} $active={page !== 1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </PageButton>
          <PageButton
            onClick={() => changePage(1)}
            $active={page !== totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </PageButton>
        </PaginationButtons>
      </PaginationControls>
    </PaginationWrapper>
  );
};
