import { ipcRenderer } from "electron";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Button from "./ui/Button";

import { storeGet, storeSet } from "@/store/main";

interface FormValues {
  siteId: string;
  apiKey: string;
}

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const { siteId, apiKey } = data;

    try {
      storeSet("siteId", siteId);
      storeSet("apiKey", apiKey);
      navigate("/app");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
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
          <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <img
              src="/plaulite-logo.svg"
              alt=""
              width="150"
              style={{
                marginBottom: 24,
              }}
            />
            <InputFieldWrapper>
              <Label>Site ID (Domain)</Label>
              <InputField
                {...register("siteId", {
                  required: true,
                  pattern:
                    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
                })}
                autoCorrect="off"
                placeholder="example.com"
              />
              {errors?.siteId && (
                <ErrorWrapper>
                  <ErrorText
                    initial={{
                      opacity: 0,
                    }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.15,
                    }}
                  >
                    Please enter a valid domain
                  </ErrorText>
                </ErrorWrapper>
              )}
            </InputFieldWrapper>
            <InputFieldWrapper>
              <Label>API key</Label>
              <InputField
                {...register("apiKey", {
                  required: true,
                  validate: (value) => value.length === 64,
                })}
              />
              {errors?.apiKey && (
                <ErrorWrapper>
                  <ErrorText
                    initial={{
                      opacity: 0,
                    }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.15,
                    }}
                  >
                    API key must be 64 characters long
                  </ErrorText>
                </ErrorWrapper>
              )}
            </InputFieldWrapper>
            <Button
              style={{
                marginTop: 8,
              }}
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.99,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              Save
            </Button>
          </FormStyled>
          <LinearBackground />
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
  position: relative;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 2px;
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
  margin-bottom: 20px;
  -webkit-appearance: none;

  &::placeholder {
    color: var(--primaryColorLighter);
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

const LinearBackground = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    -135deg,
    var(--primaryColor),
    var(--secondaryColor)
  );
  opacity: 0.1;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  pointer-events: none;
`;

const ErrorWrapper = styled.div`
  position: absolute;
  color: crimson;
  bottom: 0;
  left: 0;
`;

const ErrorText = styled(motion.span)`
  font-size: 1.2rem;
`;
