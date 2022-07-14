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
      data={[viewsHistory, gapViewsHistory]}
      yLabel={["Views", "Increase views"]}
      xLabel={date}
    />
  );
}
