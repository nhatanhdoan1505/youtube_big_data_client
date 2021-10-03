import { useRouter } from "next/router";
import VideoView from "../../features/channel/components/VideoView";

function ChannelInfor() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <VideoView />
    </>
  );
}

export default ChannelInfor;
