// GenericInput.tsx
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { cn } from "../../../utils/cn";
import { GenericInputProps } from "./interface";

const GenericInput = React.forwardRef<HTMLInputElement, GenericInputProps>(
  (
    {
      label,
      optional,
      rows,
      handleChange,
      iconAlign = "end",
      labelDesc,
      containerClassName,
      iconName,
      focus,
      type,
      onClear,
      isLoading,
      inputClass,
      required,
      error,
      ...inputProps
    },
    ref
  ) => {
    const [isVisible, setVisible] = useState(false);
    const inputId = inputProps.id || inputProps.name;
    const [, setFocused] = React.useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const inputClassName = `bg-white border ${
      error ? "border-red-500" : "border-gray-300"
    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 disabled:bg-gray-50 focus:border-primary-600 block w-full z-50 p-3.5 ${inputClass}`;

    const renderIcon = () => {
      if (!iconName) return null;
      const defaultIcon = (
        <Icon
          name={iconName}
          alt={iconName}
          className='h-[24px] w-[24px] text-placeholder'
          // colored={errorMessage ? 'error' : focused ? 'input_focus' : 'muted'}
        />
      );

      const closeIcon = (
        <button
          onClick={(e) => {
            if (onClear && typeof onClear === "function") {
              onClear(e);
            }
          }}
          title='clear'
          aria-label='clear input'
        >
          <Icon
            name='cancel'
            className='h-4 w-4'
            alt='clear input'
            variant={"rounded"}
          />
        </button>
      );

      return (
        <div
          className={cn("absolute top-1/2 flex -translate-y-1/2 transform", {
            "left-[10px]": iconAlign === "start",
            "right-[10px]": iconAlign === "end",
          })}
        >
          {iconName === "search"
            ? inputProps.value
              ? closeIcon
              : defaultIcon
            : defaultIcon}
        </div>
      );
    };

    return (
      <div className={`mb-4 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-[#1F1F1F] mb-2 text-sm font-medium ${
              error ? "text-red-500" : "text-gray-700"
            } lg:text-[15px] text-[100]`}
          >
            {label}
            {required && <span className='text-red-900 text-lg'> *</span>}
            {optional && (
              <span className='text-gray-500 text-[10px] ml-1'>(Optional)</span>
            )}
            {labelDesc && (
              <span className='text-gray-500 text-[10px]'>({labelDesc})</span>
            )}
          </label>
        )}
        {type === "textarea" ? (
          <textarea
            {...inputProps}
            rows={rows || 3}
            value={inputProps.value}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputClassName}
          />
        ) : (
          <div className='relative'>
            {renderIcon()}
            {isLoading && (
              <div
                className={cn(
                  "absolute right-[10px] top-1/2 flex -translate-y-1/2 transform"
                )}
              >
                <Icon
                  name={"spinner"}
                  alt={"loading"}
                  className='h-[24px] w-[24px] text-placeholder'
                  colored={"muted"}
                />
              </div>
            )}
            <input
              {...inputProps}
              id={inputId}
              ref={ref}
              autoFocus={focus}
              onFocus={onFocus}
              onBlur={onBlur}
              type={
                type === "password"
                  ? !isVisible
                    ? "password"
                    : "text"
                  : "text"
              }
              value={inputProps.value}
              onChange={handleChange}
              className={cn(
                `border bg-[#fff] ${
                  error ? "border-red-500" : "border-gray-300"
                }  text-gray-900 text-sm rounded-lg z-50 focus:${
                  error ? "ring-red-500" : "ring-primary-600"
                } focus:border-primary-600 block w-full p-2.5 bg-white`,
                inputClassName
              )}
            />
            {type === "password" && (
              <Icon
                onClick={() => setVisible(!isVisible)}
                className='absolute cursor-pointer top-[0.95rem] right-3'
                name={isVisible ? "visible" : "invisible"}
                alt='password visibility'
              />
            )}
          </div>
        )}
        {type === 'password' && label === 'Create a password' && (
             <p className="text-xs text-gray-500 mt-1 text-left">
             Use 8 or more characters with a mix of letters, numbers & symbols
           </p>
        ) }
        {error && (
          <p
            data-testid='error-text'
            className='text-red-500 text-sm text-right text-[10px] mt-1'
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

GenericInput.displayName = "GenericInput";

export default GenericInput;
