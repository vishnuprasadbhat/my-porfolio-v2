"use client";
import React from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";
import { useFormStatus } from "react-dom";

const Button = ({ children, type, onClick, classes, isForm, ...rest }) => {
  const { theme } = useTheme();
  const { pending } = useFormStatus();
  if (type === "primary") {
    return (
      <button
        {...rest}
        onClick={onClick}
        type={isForm ? "submit" : "button"}
        disabled={pending}
        aria-disabled={pending}
        className={`relative text-sm tablet:text-base px-2 py-1 pt-1.5 m-1 laptop:m-2 rounded-lg bg-accent-100 ${
          theme === "dark" ? "text-white" : "text-black"
        }  transition-all duration-400 ease-out first:ml-0 hover:scale-105 active:scale-100 link ${
          data?.showCursor ? "cursor-none" : "undefined"
        } ${
          isForm && pending ? "button-loading text-transparent" : undefined
        } ${classes}`}
      >
        {children}
      </button>
    );
  }

  if (type === "link") {
    return (
      <button
        {...rest}
        onClick={onClick}
        type="button"
        className={`text-sm tablet:text-base px-0 py-1 pt-1.5 m-1 laptop:m-2  flex items-center hover:text-accent tablet:first:ml-0 disabled:text-transparent ${
          data?.showCursor ? "cursor-none" : "undefined"
        } ${classes} link`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      {...rest}
      onClick={onClick}
      type={isForm ? "submit" : "button"}
      disabled={pending}
      aria-disabled={pending}
      className={`text-sm tablet:text-base px-2 py-1 pt-1.5 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 ${
        theme === "dark"
          ? "hover:bg-slate-600 text-white"
          : "hover:bg-accent-800"
      } hover:scale-105 active:scale-100  tablet:first:ml-0  ${
        data?.showCursor ? "cursor-none" : "undefined"
      } ${
        isForm && pending ? "button-loading text-transparent" : undefined
      } ${classes} link`}
    >
      {children}
    </button>
  );
};

export default Button;
