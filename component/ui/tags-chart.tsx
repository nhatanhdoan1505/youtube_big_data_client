import { useChannelTags } from "@hook/index";
import { BarChart } from ".";

export function TagsChart() {
  const { channelTagList } = useChannelTags();
  const render = channelTagList ? (
    <BarChart
      data1={channelTagList.tagsCount}
      data2={channelTagList.tagsNumber.map((n) => n.toString())}
      label="Number of Tags"
    />
  ) : null;
  return render;
}
