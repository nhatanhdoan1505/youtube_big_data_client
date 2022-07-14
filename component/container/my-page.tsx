import { useAppSelector } from "@app/index";
import { VStack } from "@chakra-ui/react";
import { EditProfile, MyChannelOverview, VsCompetitor } from "@component/ui";
import { selectChannelOverview, selectSortType } from "@store/index";

export function MyChannelPage() {
  const sortTypeSelector = useAppSelector(selectSortType);
  const channelOverviewSelector = useAppSelector(selectChannelOverview);
  const render = (
    <VStack w="100%">
      <VStack w="100%">
        {sortTypeSelector === "myPageOverview" ? (
          <MyChannelOverview />
        ) : sortTypeSelector === "vsTrend" ? (
          <h1>vsTrend</h1>
        ) : sortTypeSelector === "vsCompetitor" ? (
          <VsCompetitor />
        ) : sortTypeSelector === "editProfile" ? (
          <>
            <EditProfile />
          </>
        ) : null}
      </VStack>
      {/* <Link
        href={`/channel/overview/${channelOverviewSelector.id}`}
        target="_blank"
        py={10}
        fontWeight="light"
        color="red"
      >
        More Detail
      </Link> */}
    </VStack>
  );

  return render;
}
