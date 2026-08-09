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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const TablePagination = ({
  changePage,
  safeStart,
  safeEnd,
  total,
  page,
  totalPages,
  setPageSize,
  pageSize,
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
          <PageButton type="button" onClick={() => changePage(-1)} $active={page !== 1}>
            <ChevronLeftIcon />
          </PageButton>
          <PageButton
            type="button"
            onClick={() => changePage(1)}
            $active={page !== totalPages}
          >
            <ChevronRightIcon />
          </PageButton>
        </PaginationButtons>
      </PaginationControls>
    </PaginationWrapper>
  );
};
