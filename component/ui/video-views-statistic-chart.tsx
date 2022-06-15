import { IVideoViewsStatisticForChart } from "@hook/index";
import { Doughnut } from "react-chartjs-2";

export function VideoViewStatisticChart({
  videoViewsStatistic,
}: {
  videoViewsStatistic: IVideoViewsStatisticForChart;
}) {
  return (
    <Doughnut
      data={{
        labels: videoViewsStatistic.views,
        datasets: [
          {
            data: videoViewsStatistic.videoCount,
            backgroundColor: videoViewsStatistic.color,
            label: "Video Count",
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
