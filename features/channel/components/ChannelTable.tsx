import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Code, Divider, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { IChannel } from "../../../models";
import { formatDate } from "../../../utils/common";
import {
  channelAction,
  selectDate,
  selectIsDescending,
  selectSortBy,
} from "../channelSlice";
import ChannelRow from "./ChannelRow";

function ChannelTable(props: { channels: IChannel[] }) {
  const sortBy = useAppSelector(selectSortBy);
  const isDescending = useAppSelector(selectIsDescending);
  const date = useAppSelector(selectDate);
  const dispatch = useAppDispatch();
  console.log({ date });
  const setSortBy = (
    sort:
      | "gapNumberVideos"
      | "gapViews"
      | "gapSubcribe"
      | "subscribe"
      | "numberVideos"
      | "views"
  ) => {
    dispatch(channelAction.sortChannel(sort));
  };
  return (
    <>
      <Divider />
      {date.length > 1 ? (
        <Code px={2} borderRadius="base">
          {formatDate(date[0])} - {formatDate(date[1])}
        </Code>
      ) : null}
      <Table variant="simple" size="sm">
        {props.channels.length !== 0 ? (
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Title</Th>
              <Th
                color={sortBy === "numberVideos" ? "red.500" : ""}
                onClick={() => setSortBy("numberVideos")}
              >
                Number Videos
                {sortBy === "numberVideos" && isDescending ? (
                  <span>
                    <ArrowDownIcon mx={3} />
                  </span>
                ) : sortBy === "numberVideos" && !isDescending ? (
                  <span>
                    <ArrowUpIcon mx={3} />
                  </span>
                ) : (
                  ""
                )}
              </Th>
              <Th
                color={sortBy === "gapNumberVideos" ? "red.500" : ""}
                onClick={() => setSortBy("gapNumberVideos")}
              >
                Gap Number Videos{" "}
                {sortBy === "gapNumberVideos" && isDescending ? (
                  <span>
                    <ArrowDownIcon mx={3} />
                  </span>
                ) : sortBy === "gapNumberVideos" && !isDescending ? (
                  <span>
                    <ArrowUpIcon mx={3} />
                  </span>
                ) : (
                  ""
                )}
              </Th>
              <Th
                color={sortBy === "subscribe" ? "red.500" : ""}
                onClick={() => setSortBy("subscribe")}
              >
                Subscribe{" "}
                {sortBy === "subscribe" && isDescending ? (
                  <span>
                    <ArrowDownIcon mx={3} />
                  </span>
                ) : sortBy === "subscribe" && !isDescending ? (
                  <span>
                    <ArrowUpIcon mx={3} />
                  </span>
                ) : (
                  ""
                )}
              </Th>
              <Th
                color={sortBy === "gapSubcribe" ? "red.500" : ""}
                onClick={() => setSortBy("gapSubcribe")}
              >
                Gap Subscribe
                {sortBy === "gapSubcribe" && isDescending ? (
                  <span>
                    <ArrowDownIcon mx={3} />
                  </span>
                ) : sortBy === "gapSubcribe" && !isDescending ? (
                  <span>
                    <ArrowUpIcon mx={3} />
                  </span>
                ) : (
                  ""
                )}
              </Th>
              <Th
                color={sortBy === "views" ? "red.500" : ""}
                onClick={() => setSortBy("views")}
              >
                Views
                {sortBy === "views" && isDescending ? (
                  <span>
                    <ArrowDownIcon mx={3} />
                  </span>
                ) : sortBy === "views" && !isDescending ? (
                  <span>
                    <ArrowUpIcon mx={3} />
                  </span>
                ) : (
                  ""
                )}
              </Th>
              <Th
                color={sortBy === "gapViews" ? "red.500" : ""}
                onClick={() => setSortBy("gapViews")}
              >
                Gap Views
                {sortBy === "gapViews" && isDescending ? (
                  <span>
                    <ArrowDownIcon mx={3} />
                  </span>
                ) : sortBy === "gapViews" && !isDescending ? (
                  <span>
                    <ArrowUpIcon mx={3} />
                  </span>
                ) : (
                  ""
                )}
              </Th>
            </Tr>
          </Thead>
        ) : (
          <></>
        )}

        <Tbody>
          {props.channels.map((c, index) => (
            <ChannelRow key={c.id} index={index + 1} {...c} />
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default ChannelTable;
