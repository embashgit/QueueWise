import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { IButtonProps, buttonVariants } from "./interface";
import Icon, { IconName } from "../Icon";
import { cn } from "../../../utils/cn";

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      className,
      lefticon,
      variant,
      icon,
      loading,
      colored,
      size,
      Iconsize = "lg",
      onClick,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const loaderComp = (
      <svg
        className='w-5 h-5 animate-spin text-emerald-500 group-hover:text-emerald-600 group-focus:text-emerald-700'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        role='graphics-symbol'
        aria-labelledby='title-56 desc-56'
      >
        <title id='title-56'>Loading Icon</title>
        <desc id='desc-56'>Loader</desc>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-1'
          fill='white'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {lefticon && (
          <Icon name={lefticon as IconName} size={Iconsize} alt='Button icon'></Icon>
        )}
        {
          lefticon && (
            <span className='w-[10px]'></span>
          ) /** Space between icon and text */
        }
        {loading ? loaderComp : props.children}
        {icon && (
          <Icon
            name={icon}
            colored={colored}
            size={Iconsize}
            alt='Button icon'
          ></Icon>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
