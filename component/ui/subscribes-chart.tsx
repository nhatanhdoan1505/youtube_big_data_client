import { LineChart } from ".";

interface ISubscribesChartProps {
  subscribesHistory: number[];
  gapSubscribesHistory: number[];
  date: string[];
}

export function SubscribeChart({
  subscribesHistory,
  gapSubscribesHistory,
  date,
}: ISubscribesChartProps) {
  return (
    <LineChart
      data1={subscribesHistory}
      data2={gapSubscribesHistory}
      yLabel1="Subscribes"
      yLabel2="Increase subscribes"
      xLabel={date}
    />
  );
}
