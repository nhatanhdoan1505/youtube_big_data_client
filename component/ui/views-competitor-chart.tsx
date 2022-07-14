import { LineChart } from ".";

export function CompetitorChart({
  data,
  yLabel,
  xLabel,
}: {
  data: number[][];
  yLabel: string[];
  xLabel: string[];
}) {
  return <LineChart data={data} yLabel={yLabel} xLabel={xLabel} />;
}
