import React from "react";
import { Line } from "react-chartjs-2";
import { getMinAndMax } from "../../../utils/common";

interface IChartProp {
  title: string;
  views: number[];
  date: string[];
}

function Chart({ title, views, date }: IChartProp) {
  let { min, max } = getMinAndMax(views);
  return (
    <>
      <Line
        data={{
          labels: date,
          datasets: [
            {
              label: title,
              data: views,
              borderColor: "rgba(185, 22, 71)",
              fill: false,
              cubicInterpolationMode: "monotone",
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title,
              color: "#000000",
              font: {
                size: 20,
                weight: "bold",
                lineHeight: 1.2,
              },
              padding: { top: 20, bottom: 0 },
            },
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
              title: {
                display: true,
                text: "Views",
              },
              type: "logarithmic",
              suggestedMin: min,
              suggestedMax: max,
            },
          },
        }}
      />
    </>
  );
}

export default Chart;
