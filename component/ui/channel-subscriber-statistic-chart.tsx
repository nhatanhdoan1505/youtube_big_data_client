import { IChannelSubscriberStatisticForChart } from "@hook/index";
import { Doughnut } from "react-chartjs-2";

export function ChannelSubscriberStatisticChart({
  channelSubscriberStatistic,
}: {
  channelSubscriberStatistic: IChannelSubscriberStatisticForChart;
}) {
  return (
    <Doughnut
      data={{
        labels: channelSubscriberStatistic.subscriber,
        datasets: [
          {
            data: channelSubscriberStatistic.channelCount,
            backgroundColor: channelSubscriberStatistic.color,
            label: "Channel Count",
            hoverOffset: 4,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          //   title: {
          //     text: "Video Count",
          //     color: "#000000",
          //     font: {
          //       size: 15,
          //       weight: "bold",
          //       lineHeight: 1.2,
          //     },
          //     padding: { top: 20, bottom: 0 },
          //   },
        },
        interaction: {
          intersect: false,
        },
      }}
    />
  );
}
