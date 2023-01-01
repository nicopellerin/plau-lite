import styled from "styled-components";
import { motion } from "framer-motion";

interface StyleProps {
  variant?: "primary";
}

const variants: Record<"primary", Record<string, string>> = {
  primary: {
    backgroundColor: "var(--primaryButtonColor)",
  },
};

const Button = styled(motion.button)`
  border: none;
  padding: 16px 20px;
  font-size: 1.6rem;
  border-radius: var(--border-radius-4);
  background: ${({ variant = "primary" }: StyleProps) =>
    variant && variants[variant].backgroundColor};
  color: #f4f4f4;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  will-change: transform;
  filter: ${({ variant = "primary" }: StyleProps) =>
    variant && variants[variant].filter};
  line-height: 1;
  transition: filter 0.2s ease;
  justify-content: center;
  font-family: var(--headingFont);

  @media (max-width: 500px) {
    width: 100%;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;
