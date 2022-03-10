import { LineChart } from ".";

interface IVideoChartProps {
  viewsHistory: number[];
  gapViewsHistory: number[];
  date: string[];
}

export function VideoChart({
  viewsHistory,
  gapViewsHistory,
  date,
}: IVideoChartProps) {
  return (
    <LineChart
      data1={viewsHistory}
      data2={gapViewsHistory}
      yLabel1="Views"
      yLabel2="Increase views"
      xLabel={date}
    />
  );
}
