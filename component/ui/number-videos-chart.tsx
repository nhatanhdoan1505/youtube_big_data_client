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
      data1={numberVideosHistory}
      data2={gapNumberVideosHistory}
      yLabel1="Number Videos"
      yLabel2="Increase Number Videos"
      xLabel={date}
    />
  );
}
