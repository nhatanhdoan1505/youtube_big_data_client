import { Bar } from "react-chartjs-2";

interface IChartProp {
  data1: number[];
  data2: string[];
  label: string;
}

export function BarChart({ data1, data2, label }: IChartProp) {
  return (
    <>
      <Bar
        data={{
          labels: data2,
          datasets: [
            { data: data1, backgroundColor: "rgba(185, 22, 71)", label },
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
              ticks: {
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
