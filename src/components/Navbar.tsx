import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";

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

  const handleRefresh = () => {
    client.refetchQueries(["plausibleData", storeGet("siteId")]);
    client.refetchQueries(["plausibleRealtimeData", storeGet("siteId")]);
  };

  const handleLogout = () => {
    storeDelete("siteId");
    storeDelete("apiKey");
  };

  return (
    <Wrapper>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <SiteIdTitle>{storeGet("siteId")}</SiteIdTitle>
        {!isLoadingRealtime && !isFetchingRealtime && (
          <Group
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
            }}
            style={{
              marginTop: 1,
            }}
          >
            {error ? (
              <StatusCircle
                style={{
                  background: "crimson",
                }}
              />
            ) : (
              <StatusCircle
                style={{
                  background: "var(--success)",
                }}
              />
            )}
            <RealtimeText>{dataRealtime}</RealtimeText>
          </Group>
        )}
      </div>
      <Group>
        <motion.button
          title="Refresh"
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
            transformOrigin: "50% 50%",
          }}
          onClick={handleRefresh}
        >
          <HiRefresh size={18} color="var(--primaryColorLighter)" />
        </motion.button>
        <Link to="/">
          <motion.button
            title="Log out"
            transition={{
              type: "spring",
              damping: 20,
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginTop: 2,
            }}
            onClick={handleLogout}
          >
            <FaSignOutAlt size={16} color="var(--primaryColorLighter)" />
          </motion.button>
        </Link>
      </Group>
    </Wrapper>
  );
};

export default Navbar;

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
  box-shadow: 0 0.4rem 5rem rgba(131, 82, 253, 0.05);
`;

const SiteIdTitle = styled.h1`
  font-size: 1.6rem;
  color: var(--primaryColorLighter);
  line-height: 1;
  font-weight: 700;
  margin: 0;
  user-select: none;
`;

const Group = styled(motion.div)`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const RealtimeText = styled.span`
  font-size: 1.4rem;
  line-height: 1;
  font-weight: 700;
  user-select: none;
`;

const StatusCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 8px;
`;
