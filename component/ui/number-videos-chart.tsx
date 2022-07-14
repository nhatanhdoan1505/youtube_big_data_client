import { LineChart } from ".";

interface INumberVideosChartProps {
  numberVideosHistory: number[];
  gapNumberVideosHistory: number[];
  date: string[];
}

export function NumberVideosChart({
  numberVideosHistory,
  gapNumberVideosHistory,
  date,
}: INumberVideosChartProps) {
  return (
    <LineChart
      data={[numberVideosHistory, gapNumberVideosHistory]}
      yLabel={["Number Videos", "Increase Number Videos"]}
      xLabel={date}
    />
  );
}
