import { VariantProps, cva } from "class-variance-authority";
import { Route } from "next";
import { IconName } from "../Icon";

export const buttonVariants = cva(
  "active:bg-active cursor-pointer active:text-primary inline-flex items-center justify-center rounded-sm text-body5 sm:text-body3 ring-offset-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary hover:text-gray cursor-pointer",
        outline:
          "cursor-pointer text-default border border-[#3484FC] hover:text-default hover:bg-paid-light hover:border-active",
        secondary:
          "cursor-pointer text-white border border-[#3484FC] bg-[#3484FC] hover:text-primary hover:border-active hover:bg-[#064199]",
        link: "disabled:text-muted bg-transparent underline-offset-4 text-link disabled:text-link-disabled active:bg-transparent active:text-primary/80",
        theme: "bg-primary text-primary dark hover:text-gray  ",
      },
      size: {
        default: "h-10 sm:h-[37px] sm:w-[93px] w-[87px]",
        fill: "w-full",
        lg: "h-10 sm:h-[39px] w-[290px]",
        md: "max-h-[8px]",
        sm: "px-2",
        fit: "w-fit",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type colorType =
  | "muted"
  | "gray-trust"
  | "white"
  | "yellow"
  | "primary"
  | null
  | undefined;
export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: Route;
  lefticon?: string;
  Iconsize?: "lg" | "sm" | "md" | "xxxl" | "xxl";
  onClick?: () => void;
  icon?: IconName;
  colored?: colorType;
  loading?: boolean;
}

export interface ISolidButton {
  title: string;
  triggerFor: "sheet" | "dropdown";
  dropdownOpen?: boolean;
  buttonClass?: string;
  onClick?: () => void;
}
