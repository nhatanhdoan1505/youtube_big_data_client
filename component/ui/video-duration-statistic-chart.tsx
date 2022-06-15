import { IVideoDurationStatisticForChart } from "@hook/index";
import { Bar } from "react-chartjs-2";

export function DurationStatisticChart({
  videoDurationStatistic,
}: {
  videoDurationStatistic: IVideoDurationStatisticForChart;
}) {
  return (
    <Bar
      data={{
        labels: videoDurationStatistic.duration,
        datasets: [
          {
            data: videoDurationStatistic.videoCount,
            backgroundColor: "rgba(185, 22, 71)",
            label: "Video Count",
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
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Video Duration",
            },
            // ticks: {
            //   callback: function (value, index, ticks) {
            //     return +value >= 1000000000
            //       ? `~${(+value / 1000000000).toFixed(1)}B`
            //       : +value >= 1000000
            //       ? `~${(+value / 1000000).toFixed(1)}M`
            //       : +value >= 1000
            //       ? `~${(+value / 1000).toFixed(1)}K`
            //       : `~${+value}`;
            //   },
            // },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Video Count",
            },
            //   suggestedMin: min,
            //   suggestedMax: max,
          },
        },
      }}
    />
  );
}
