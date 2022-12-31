import styled from "styled-components";
import { SyntheticEvent, useState } from "react";
import { FiRefreshCw, FiSettings } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import Button from "./components/ui/Button";

import usePlausibleRealtimeData from "./hooks/usePlausibleRealtimeData";
import usePlausibleData from "./hooks/usePlausibleData";

import { storeGet, storeSet } from "./store/main";

function App() {
  const { data, error, isLoading, isFetching } = usePlausibleData();
  const {
    data: dataRealtime,
    isLoading: isLoadingRealtime,
    isFetching: isFetchingRealtime,
  } = usePlausibleRealtimeData();

  const client = useQueryClient();

  const [siteId, setSiteId] = useState("");
  const [apiKey, setApiKey] = useState("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    storeSet("siteId", siteId);
    storeSet("apiKey", apiKey);
  };

  if (!storeGet("siteId")) {
    return (
      <Wrapper>
        <FormStyled onSubmit={onSubmit}>
          <FormTitle>Enter credentials</FormTitle>
          <InputFieldWrapper>
            <Label>Site id</Label>
            <InputField
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <Label>API key</Label>
            <InputField
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </InputFieldWrapper>
          <Button
            style={{
              marginTop: 8,
            }}
          >
            Save
          </Button>
        </FormStyled>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Navbar>
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
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    background: "var(--success)",
                  }}
                />
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
            >
              <FiSettings size={16} color="var(--primaryColorLighter)" />
            </motion.button>
          </div>
        </Navbar>
        <StatsContainer>
          {isLoading || isFetching ? (
            <Title>Loading...</Title>
          ) : (
            <Stats
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
              }}
            >
              <div>
                <Title>Unique Visitors</Title>
                <Value>
                  {new Intl.NumberFormat("en-US", {
                    maximumSignificantDigits: 3,
                  }).format(Number(data?.visitors?.value))}
                </Value>
              </div>
              <div
                style={{
                  margin: "0 16px",
                  width: "1px",
                  height: "100%",
                  background: "var(--toolsBorder)",
                }}
              />

              <div>
                <Title>Page Views</Title>
                <Value>
                  {new Intl.NumberFormat("en-US", {
                    maximumSignificantDigits: 3,
                  }).format(Number(data?.pageviews?.value))}
                </Value>
              </div>
            </Stats>
          )}
        </StatsContainer>
        <ConicBackground />
      </Container>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  background: var(--backgroundColor);
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: center;
  height: 100%;
`;

const StatsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    -45deg,
    var(--inputBackground) 50%,
    var(--inputBackground)
  );
  padding: var(--spacer-20);
  border-bottom: 5px solid var(--toolsBorder);
  box-shadow: 0 0.4rem 5rem rgba(131, 82, 253, 0.05);
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 24px;
  text-align: center;
  background: var(--inputBackground);
  border-radius: var(--border-radius-4);
  border: 1px solid var(--toolsBorder);
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 4px;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: var(--primaryColorLighter);
  letter-spacing: 1px;
  font-weight: 600;
  user-select: none;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: var(--spacer-32) var(--spacer-48) var(--spacer-24);
`;

const FormTitle = styled.h2`
  margin-top: 0;
  font-size: 2.8rem;
  margin-bottom: 20px;
`;

const Value = styled.span`
  font-size: 3.2rem;
  color: var(--textColor);
  font-weight: 900;
  user-select: none;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: hsl(305, 56%, 55%);
`;

const InputField = styled.input`
  border: 1px solid var(--inputBorder);
  color: var(---textColor);
  background: var(--inputBackground);
  padding: 0.8em 0.8em;
  border-radius: var(--border-radius-4);
  font-size: 1.6rem;
  font-family: inherit;
  margin-bottom: 1.6rem;
  -webkit-appearance: none;

  &:focus {
    border: 1px solid transparent;
    outline-color: hsl(305, 56%, 55%);
  }
`;

const SiteIdTitle = styled.h1`
  font-size: 1.6rem;
  color: var(--primaryColorLighter);
  line-height: 1;
  font-weight: 700;
  margin: 0;
  user-select: none;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacer-16) var(--spacer-24);
  padding-top: 34px;
  border-bottom: 1px solid var(--toolsBorder);
  background: var(--inputBackground);
  color: var(--headingColor);
`;

const ConicBackground = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background: conic-gradient(
    from 180deg at 50% 50%,
    var(--primaryColor) 0deg,
    var(--secondaryColor) 180deg,
    var(--tertiaryColor) 360deg
  );
  filter: blur(150px);
  opacity: 0.22;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  pointer-events: none;
`;
