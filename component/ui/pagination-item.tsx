import { useAppDispatch, useAppSelector } from "@app/index";
import { Button } from "@chakra-ui/react";
import {
  selectPageNumber,
  selectSortType,
  selectTotalPage,
  youtubeAction,
} from "@store/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function PaginationItem({ pageNumber }: { pageNumber: number }) {
  const router = useRouter();

  const pageNumberSelector = useAppSelector(selectPageNumber);
  const sortTypeSelector = useAppSelector(selectSortType);
  const totalPageSelector = useAppSelector(selectTotalPage);
  const dispatch = useAppDispatch();
  const handlerClickButton = () => {
    router.push(`/topList/topVideo/${sortTypeSelector}/${pageNumber}`);
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
