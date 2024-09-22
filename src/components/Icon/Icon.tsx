import Image, { StaticImageData, type ImageProps } from "next/image";
import React, { useEffect, useState } from "react";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { fallback } from "../../../public/assets";


import classes from "./Icon.module.scss";
import { VariantProps, cva } from "class-variance-authority";
import { useTheme } from "next-themes";
import { IconName } from "./index";
import { cn } from "../../../utils/cn";

const iconVariants = cva("", {
  variants: {
    variant: {
      rounded: "rounded-[50%]",
    },
    darkMode: {
      default: "",
      muted: classes["icon--muted"],
      "gray-trust": classes["icon--gray-trust"],
      white: classes["icon--white"],
      yellow: classes["icon--yellow"],
      primary: classes["icon--primary"],
    },
    colored: {
      muted: classes["icon--muted"],
      white: classes["icon--white"],
      "gray-trust": classes["icon--gray-trust"],
      red: classes["icon--red-trust"],
      default: classes["icon--blue-trust"],
      yellow: classes["icon--yellow"],
      primary: classes["icon--primary"],
    },
    size: {
      sm: "h-[14px]",
      md: "h-[20px]",
      lg: "h-[36px]",
      xxl: "h-[74px]",
      xxxl: "h-[142px]",
    },
  },
  compoundVariants: [
    {
      variant: "rounded",
      size: "lg",
      className: "w-[36px]",
    },
    {
      variant: "rounded",
      size: "md",
      className: "w-[20px]",
    },
    {
      variant: "rounded",
      size: "sm",
      className: "w-[14px]",
    },
  ],
});

type IconProps =
  | {
      name: IconName;
      src?: string;
      locale?: never;
    }
  | {
      name?: never;
      src?: string;
      locale: string;
    }
  | {
      name?: never;
      src: string;
      locale?: never;
    };

export type IIconProps = Omit<ImageProps, "src"> &
  VariantProps<typeof iconVariants> &
  IconProps;

/**
 * Use across app for all icon needs.
 * - Provide name as per asset file name
 * @return {React.ReactNode} `next/image`
 */
const Icon = ({
  name,
  alt,
  variant,
  size,
  colored,
  darkMode,
  className,
  locale,
  ...props
}: IIconProps) => {
  const { resolvedTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const [icon, setIcon] = useState(fallback);

  useEffect(() => {
    if (props.src) return;

    if (name) {
      import("../../../public/assets")
        .then((module) => {
          setIcon(
            (module as Record<string, StaticImageData>)[name as keyof typeof module] || fallback
          );
        })
        .catch(() => {
          setIcon(fallback);
        });
    }
  }, [name, props.src, locale]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <AccessibleIcon.Root label={alt}>
      <Image
        className={cn(
          iconVariants({
            variant,
            size,
            colored,
            ...{
              darkMode: resolvedTheme === "dark" ? darkMode : "default",
            },
            className,
          }),
          "select-none"
        )}
        src={icon}
        alt={alt}
        data-testid={name}
        {...props}
      />
    </AccessibleIcon.Root>
  );
};

export default Icon;
