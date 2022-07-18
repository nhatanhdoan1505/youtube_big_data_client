import * as randomColor from "randomcolor";
import { Line } from "react-chartjs-2";

interface IChartProp {
  data: number[][];
  yLabel: string[];
  xLabel: string[];
}

export function LineChart({ data, xLabel, yLabel }: IChartProp) {
  const competitorColor = [
    "rgb(55, 125, 113)",
    "rgb(251, 161, 161)",
    "rgb(249, 76, 102)",
  ];
  return (
    <>
      <Line
        data={{
          labels: xLabel,
          datasets: data.map((d, index) => ({
            label: yLabel[index],
            data: d,
            borderColor:
              data.length <= 3
                ? competitorColor.slice(0, data.length)
                : randomColor({ luminosity: "bright", format: "rgb" }),
            fill: false,
            cubicInterpolationMode: "monotone",
            tension: 0.4,
          })),
        }}
        options={{
          responsive: true,
          plugins: {
            // title: {
            //   text: yLabel,
            //   color: "#000000",
            //   font: {
            //     size: 15,
            //     weight: "bold",
            //     lineHeight: 1.2,
            //   },
            //   padding: { top: 20, bottom: 0 },
            // },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
              },
            },
            y: {
              display: true,
              //   title: {
              //     display: true,
              //     text: yLabel,
              //   },
              type: "logarithmic",
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value) {
                  return +value >= 1000000000
                    ? `${(+value / 1000000000).toFixed(1)}B`
                    : +value >= 1000000
                    ? `${(+value / 1000000).toFixed(1)}M`
                    : +value >= 1000
                    ? `${(+value / 1000).toFixed(1)}K`
                    : +value;
                },
              },
              //   suggestedMin: min,
              //   suggestedMax: max,
            },
          },
        }}
      />
    </>
  );
}
