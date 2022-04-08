import { useAppSelector } from "@app/index";
import { selectSortType } from "@store/index";
import { ChannelOverview } from ".";
import { TableContainerFull } from "./table-container-full";

export function ChannelInformation() {
  const sortTypeSelector = useAppSelector(selectSortType);
  const render =
    sortTypeSelector === "overview" ? (
      <ChannelOverview />
    ) : sortTypeSelector === "topVideo" ? (
      <TableContainerFull>
        <></>
      </TableContainerFull>
    ) : null;

  return render;
}
