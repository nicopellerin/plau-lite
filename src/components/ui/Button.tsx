import styled from "styled-components";
import { motion } from "framer-motion";

interface StyleProps {
  variant?: "primary" | "secondary" | "success" | "gradient" | "similarTracks";
}

const variants: Record<
  "primary" | "secondary" | "success" | "gradient" | "similarTracks",
  Record<string, string>
> = {
  primary: {
    backgroundColor: "var(--primaryButtonColor)",
    filter: "drop-shadow(0 0 0.75rem rgba(204, 75, 194, 0.5))",
  },
  secondary: {
    backgroundColor: "var(--secondaryColor)",
    filter: "drop-shadow(0 0 0.75rem rgba(221, 94, 152, 0.5))",
  },
  success: {
    backgroundColor: "var(--success)",
    filter: "drop-shadow(0 0 0.75rem hsla(123, 65%, 42%, 0.5))",
  },
  gradient: {
    backgroundColor: `linear-gradient(
      -145deg,
      var(--primaryColor),
      var(--secondaryColor)
    )`,
    filter: "drop-shadow(0 0 0.75rem rgba(221, 94, 152, 0.5))",
  },
  similarTracks: {
    backgroundColor: `#112`,
    // filter: 'drop-shadow(0 0 0.75rem rgba(221, 94, 152, 0.5))',
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

  &:hover {
    filter: drop-shadow(0 0px 0.75rem rgba(204, 75, 194, 0.8));
  }
`;

export default Button;
