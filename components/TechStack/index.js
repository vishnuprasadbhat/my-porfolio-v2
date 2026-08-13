"use client";
import React from "react";
import { useTheme } from "next-themes";
import StackIcon from "tech-stack-icons";

const TechStack = ({ name, icon }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`grid grid-cols-1 justify-items-center gap-4 w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
      } hover:scale-105 link`}
    >
      <StackIcon name={icon} className="w-12" />
      <h1 className="text-xl">{name}</h1>
    </div>
  );
};

export default TechStack;
