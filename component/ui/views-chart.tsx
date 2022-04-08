import { LineChart } from ".";

interface IViewsChartProps {
  viewsHistory: number[];
  gapViewsHistory: number[];
  date: string[];
}

export function ViewChart({
  viewsHistory,
  gapViewsHistory,
  date,
}: IViewsChartProps) {
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
