import { useAppSelector } from "@app/index";
import { TableVideo, TableVideoDeleted } from "@component/ui";
import { selectSortType } from "@store/index";
import { ChannelOverview } from ".";
import { ChannelAbout } from "./channel-about";
import { TableContainerFull } from "./table-container-full";

export function ChannelInformation() {
  const sortTypeSelector = useAppSelector(selectSortType);
  const render =
    sortTypeSelector === "overview" ? (
      <ChannelOverview />
    ) : sortTypeSelector === "topVideo" ? (
      <TableContainerFull>
        <TableVideo />
      </TableContainerFull>
    ) : sortTypeSelector === "allVideo" ? (
      <TableContainerFull>
        <TableVideo />
      </TableContainerFull>
    ) : sortTypeSelector === "videoHistory" ? (
      <TableContainerFull>
        <TableVideoDeleted />
      </TableContainerFull>
    ) : sortTypeSelector === "about" ? (
      <ChannelAbout />
    ) : null;

  return render;
}
