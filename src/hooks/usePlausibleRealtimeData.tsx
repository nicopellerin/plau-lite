import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { storeGet } from "@/store/main";

function usePlausibleRealtimeData() {
  const siteId = storeGet("siteId");
  const apiKey = storeGet("apiKey");

  return useQuery(
    ["plausibleRealtimeData", siteId],
    async () => {
      const { data } = await axios.get(
        `https://plausible.io/api/v1/stats/realtime/visitors?site_id=${siteId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      return data as number;
    },
    {
      enabled: !!siteId && !!apiKey,
      staleTime: 1000 * 3,
    }
  );
}

export default usePlausibleRealtimeData;
