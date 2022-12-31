import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { storeGet } from "@/store/main";

function usePlausibleData() {
  const siteId = storeGet("siteId");
  const apiKey = storeGet("apiKey");

  return useQuery(
    ["plausibleData", siteId],
    async () => {
      const { data } = await axios.get(
        `https://plausible.io/api/v1/stats/aggregate?site_id=${siteId}&period=day&metrics=visitors,pageviews`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      return data.results as any;
    },
    {
      enabled: !!siteId && !!apiKey,
    }
  );
}

export default usePlausibleData;
