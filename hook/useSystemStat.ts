import { systemApi } from "@api/index";
import { ISystemStat } from "@models/index";
import { useEffect, useState } from "react";

export const useSystemStat = () => {
  const [systemStat, setSystemStat] = useState<ISystemStat>({
    views: 0,
    subscribers: 0,
    numberVideos: 0,
    numberChannels: 0,
  });
  useEffect(() => {
    const getSystemStat = async () => {
      const data = await systemApi.getSystemStat();
      setSystemStat(data);
    };

    getSystemStat();
  }, []);

  return systemStat;
};
