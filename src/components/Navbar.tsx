import { useQueryClient } from "@tanstack/react-query";
import { FiRefreshCw, FiSettings } from "react-icons/fi";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import usePlausibleRealtimeData from "@/hooks/usePlausibleRealtimeData";

import { storeDelete, storeGet } from "@/store/main";

const Navbar = () => {
  const {
    data: dataRealtime,
    error,
    isLoading: isLoadingRealtime,
    isFetching: isFetchingRealtime,
  } = usePlausibleRealtimeData();

  const client = useQueryClient();

  return (
    <Wrapper>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <SiteIdTitle>{storeGet("siteId")}</SiteIdTitle>
        {!isLoadingRealtime && !isFetchingRealtime && (
          <motion.div
            style={{ display: "flex", gap: 6, alignItems: "center" }}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
          >
            {error ? (
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  background: "crimson",
                }}
              />
            ) : (
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  background: "var(--success)",
                }}
              />
            )}
            <span
              style={{ fontSize: "1.4rem", lineHeight: 1, fontWeight: 700 }}
            >
              {dataRealtime}
            </span>
          </motion.div>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <motion.button
          whileTap={{
            rotate: 360,
          }}
          transition={{
            type: "spring",
            damping: 20,
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            client.refetchQueries(["plausibleData", storeGet("siteId")]);
            client.refetchQueries([
              "plausibleRealtimeData",
              storeGet("siteId"),
            ]);
          }}
        >
          <FiRefreshCw size={16} color="var(--primaryColorLighter)" />
        </motion.button>
        <Link to="/">
          <motion.button
            transition={{
              type: "spring",
              damping: 20,
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              storeDelete("siteId");
              storeDelete("apiKey");
            }}
          >
            <FiSettings size={16} color="var(--primaryColorLighter)" />
          </motion.button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const SiteIdTitle = styled.h1`
  font-size: 1.6rem;
  color: var(--primaryColorLighter);
  line-height: 1;
  font-weight: 700;
  margin: 0;
  user-select: none;
`;

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacer-16) var(--spacer-24);
  padding-top: 36px;
  border-bottom: 1px solid var(--toolsBorder);
  background: var(--inputBackground);
  color: var(--headingColor);
`;
