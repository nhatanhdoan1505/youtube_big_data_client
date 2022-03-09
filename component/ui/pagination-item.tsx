import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  selectPageNumber,
  youtubeAction,
  selectSortType,
  selectTotalPage,
} from "@store/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function PaginationItem({ pageNumber }: { pageNumber: number }) {
  const router = useRouter();

  const pageNumberSelector = useAppSelector(selectPageNumber);
  const sortTypeSelector = useAppSelector(selectSortType);
  const totalPageSelector = useAppSelector(selectTotalPage);
  const dispatch = useAppDispatch();
  const handlerClickButton = () => {
    dispatch(
      youtubeAction.setPagination({
        pageNumber,
        type: sortTypeSelector,
        totalPage: totalPageSelector,
      })
    );
  };
  const [isCurrentPage, setIsCurrentPage] = useState<boolean>(
    pageNumber === pageNumberSelector
  );

  useEffect(() => {
    setIsCurrentPage(pageNumber === pageNumberSelector);
  }, [pageNumberSelector]);

  return (
    <Button
      size="sm"
      colorScheme={isCurrentPage ? "red" : "gray"}
      onClick={handlerClickButton}
    >
      {pageNumber}
    </Button>
  );
}
