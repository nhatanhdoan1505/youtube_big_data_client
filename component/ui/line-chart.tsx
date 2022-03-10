import { Line } from "react-chartjs-2";
import { getMinAndMax } from "@utils/index";

interface IChartProp {
  data1: number[];
  data2: number[];
  yLabel1: string;
  yLabel2: string;
  xLabel: string[];
}

export function LineChart({
  data1,
  data2,
  xLabel,
  yLabel1,
  yLabel2,
}: IChartProp) {
  return (
    <>
      <Line
        data={{
          labels: xLabel,
          datasets: [
            {
              label: yLabel1,
              data: data1,
              borderColor: "rgba(185, 22, 71)",
              fill: false,
              cubicInterpolationMode: "monotone",
              tension: 0.4,
            },
            {
              label: yLabel2,
              data: data2,
              borderColor: "rgba(1, 146, 103)",
              fill: false,
              cubicInterpolationMode: "monotone",
              tension: 0.4,
            },
          ],
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
              //   suggestedMin: min,
              //   suggestedMax: max,
            },
          },
        }}
      />
    </>
  );
}
