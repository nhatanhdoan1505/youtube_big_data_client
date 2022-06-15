import { VStack, Text } from "@chakra-ui/react";
import { IChannelUploadStatisticForChart } from "@hook/index";
import { beautyNumberDisplay } from "@utils/index";
import { Pie } from "react-chartjs-2";

export function ChannelUploadStatisticChart({
  subscribers,
  averageUpload,
  color,
  videoCount,
  averageUploadLabel,
}: IChannelUploadStatisticForChart) {
  return (
    <VStack>
      <VStack alignItems="flex-start" my={3}>
        <Text fontWeight="bold">
          Subscribers{" "}
          {+subscribers < 3000000
            ? `~ ${beautyNumberDisplay(subscribers)}`
            : `300,000,000 ~`}
        </Text>
        <Text fontWeight="light">
          Average :{" "}
          <Text display="inline" fontWeight="bold">
            {+averageUpload.toFixed(1)}
          </Text>{" "}
          / Week Subscribers
        </Text>
      </VStack>
      <Pie
        data={{
          labels: averageUploadLabel,
          datasets: [
            {
              data: videoCount,
              backgroundColor: color,
              label: "Video Count",
              hoverOffset: 4,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            //   title: {
            //     text: "Video Count",
            //     color: "#000000",
            //     font: {
            //       size: 15,
            //       weight: "bold",
            //       lineHeight: 1.2,
            //     },
            //     padding: { top: 20, bottom: 0 },
            //   },
          },
          interaction: {
            intersect: false,
          },
        }}
      />
    </VStack>
  );
}
