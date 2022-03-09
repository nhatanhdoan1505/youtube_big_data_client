import { useAppSelector } from "@app/index";
import { Button, HStack, Icon, Table, Text, VStack } from "@chakra-ui/react";
import { Pagination } from "@component/ui";
import { selectTotalPage, selectVideoList } from "@store/index";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const TITLE = {
  views: "Most Views",
  likes: "Most Likes",
  commentCount: "Most Comments",
  gapViews: "Hot Videos",
};

export function TableContainerFull({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const videoListSelector = useAppSelector(selectVideoList);
  const totalPageSelector = useAppSelector(selectTotalPage);

  return (
    <VStack>
      <HStack alignItems="center" justifyContent="space-between" w="100%">
        <HStack>
          <Text as="h6" fontWeight="extrabold">
            {TITLE[title]}
          </Text>
          <HStack>
            <Icon as={AiFillCaretLeft} />
            <Icon as={AiFillCaretRight} />
          </HStack>
        </HStack>
        <HStack>
          <Button colorScheme="gray" size="sm">
            Daily
          </Button>
          <Button colorScheme="facebook" size="sm">
            Weekly
          </Button>
          <Button colorScheme="linkedin" size="sm">
            Monthly
          </Button>
        </HStack>
      </HStack>
      <Table variant="simple" colorScheme="red">
        {children}
      </Table>
      {videoListSelector.length > 0 && totalPageSelector > 1 ? (
        <Pagination />
      ) : null}
    </VStack>
  );
}
