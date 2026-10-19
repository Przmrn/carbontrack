// Button primitive: primary, outline and tertiary-link variants.
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "tertiary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export default function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button type="button" className={`cm-btn cm-btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}
