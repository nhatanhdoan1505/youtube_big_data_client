import { useAppSelector } from "@app/index";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { selectPageNumber, selectTotalPage } from "@store/index";
import { range } from "@utils/index";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { PaginationItem } from ".";

export function Pagination() {
  const pageNumberSelector = useAppSelector(selectPageNumber);
  const totalPageSelector = useAppSelector(selectTotalPage);

  const [neighborPageLeft, setNeighborPageLeft] =
    pageNumberSelector <= 2
      ? useState<number>(1)
      : useState<number>(pageNumberSelector - 2);
  const [neighborPageRight, setNeighborPageRight] =
    pageNumberSelector >= totalPageSelector - 2
      ? useState<number>(totalPageSelector)
      : useState<number>(pageNumberSelector + 2);

  useEffect(() => {
    setNeighborPageLeft(pageNumberSelector <= 2 ? 1 : pageNumberSelector - 2);
    setNeighborPageRight(
      pageNumberSelector >= totalPageSelector - 2
        ? totalPageSelector
        : pageNumberSelector + 2
    );
  }, [pageNumberSelector, totalPageSelector]);

  return (
    <HStack>
      <Icon
        as={AiOutlineArrowLeft}
        size="20px"
        color={pageNumberSelector <= 1 ? "ButtonFace" : ""}
        _hover={pageNumberSelector === 1 ? {} : { cursor: "pointer" }}
      />
      {neighborPageLeft > 3 && totalPageSelector > 7 ? (
        <>
          {range(1, 3).map((i) => (
            <PaginationItem key={i} pageNumber={i} />
          ))}
          <Text color="green">...</Text>
        </>
      ) : neighborPageLeft <= 3 ? (
        <>
          {range(1, neighborPageLeft - 1).map((i) => (
            <PaginationItem key={i} pageNumber={i} />
          ))}
        </>
      ) : totalPageSelector <= 7 && neighborPageLeft >= 3 ? (
        <>
          {range(1, neighborPageLeft - 1).map((i) => (
            <PaginationItem key={i} pageNumber={i} />
          ))}
        </>
      ) : null}

      {range(neighborPageLeft, neighborPageRight).map((i) => (
        <PaginationItem key={i} pageNumber={i} />
      ))}

      {neighborPageRight < totalPageSelector - 2 && totalPageSelector > 7 ? (
        <>
          <Text>...</Text>
          {range(totalPageSelector - 2, totalPageSelector).map((i) => (
            <PaginationItem key={i} pageNumber={i} />
          ))}
        </>
      ) : neighborPageRight >= totalPageSelector - 2 &&
        neighborPageRight < totalPageSelector ? (
        <>
          {range(neighborPageRight + 1, totalPageSelector).map((i) => (
            <PaginationItem key={i} pageNumber={i} />
          ))}
        </>
      ) : totalPageSelector <= 7 &&
        neighborPageRight <= totalPageSelector - 2 ? (
        <>
          {range(neighborPageRight + 1, totalPageSelector).map((i) => (
            <PaginationItem key={i} pageNumber={i} />
          ))}
        </>
      ) : null}
      <Icon
        as={AiOutlineArrowRight}
        size="20px"
        color={pageNumberSelector >= totalPageSelector ? "ButtonFace" : ""}
        _hover={
          pageNumberSelector === totalPageSelector ? {} : { cursor: "pointer" }
        }
      />
    </HStack>
  );
}
