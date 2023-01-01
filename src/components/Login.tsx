import { ipcRenderer } from "electron";
import { SyntheticEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { storeGet, storeSet } from "@/store/main";
import styled from "styled-components";
import Button from "./ui/Button";
import { motion } from "framer-motion";

const Login = () => {
  const [siteId, setSiteId] = useState("");
  const [apiKey, setApiKey] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    storeSet("siteId", siteId);
    storeSet("apiKey", apiKey);
    navigate("/app");
  };

  ipcRenderer.send("login-screen");

  return (
    <>
      {storeGet("siteId") ? (
        <Navigate to="/app" replace={true} />
      ) : (
        <Wrapper
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
          }}
        >
          <FormStyled onSubmit={onSubmit}>
            <InputFieldWrapper>
              <Label>Site id (domain)</Label>
              <InputField
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                autoCorrect="off"
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
      )}
    </>
  );
};

export default Login;

const Wrapper = styled(motion.div)`
  background: var(--backgroundColor);
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: var(--spacer-48) var(--spacer-48);
  background: var(--inputBackground);
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
  color: var(--primaryColorLighter);
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
    /* border: 1px solid transparent; */
    /* outline-color: hsl(305, 56%, 55%); */
    outline: none;
  }
`;
