import styled from "styled-components";
import { motion } from "framer-motion";
import { ipcRenderer } from "electron";

import usePlausibleData from "./hooks/usePlausibleData";

import Navbar from "./components/Navbar";

function App() {
  ipcRenderer.send("main-screen");

  const { data, error, isLoading, isFetching } = usePlausibleData();

  if (error) {
    return (
      <Wrapper>
        <Container>
          <Navbar />
          <ContentContainer>
            <Title>An error occured</Title>
          </ContentContainer>
          <ConicBackground />
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Navbar />
        <ContentContainer>
          {isLoading || isFetching ? (
            <Title>Loading...</Title>
          ) : (
            <Content
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
            </Content>
          )}
        </ContentContainer>
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

const ContentContainer = styled.div`
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

const Content = styled(motion.div)`
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

const Value = styled.span`
  font-size: 3.2rem;
  color: var(--textColor);
  font-weight: 900;
  user-select: none;
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
  opacity: 0.25;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  pointer-events: none;
`;
