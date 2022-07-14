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
      data={[subscribesHistory,gapSubscribesHistory]}
      yLabel={["Subscribes","Increase subscribes"]}
      xLabel={date}
    />
  );
}
