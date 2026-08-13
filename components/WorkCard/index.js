import React from "react";
import Button from "../Button";
import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const WorkCard = ({ img, name, description, url, onClick, isAboveFold }) => {
  return (
    <div className={`overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0`}>
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
        style={{ height: "300px" }}
      >
        <Image
          alt={name}
          className="h-full w-full object-fill hover:scale-110 transition-all ease-out duration-300"
          src={img}
          width={500}
          height={500}
          quality={100}
          loading={isAboveFold ? "eager" : "lazy"}
          priority={false}
        ></Image>
      </div>
      <Button
        type="link"
        onClick={onClick}
        classes={`pb-0.5 mt-5 px-0 ml-0 laptop:ml-0 text-xl laptop:text-2xl font-medium ${
          url
            ? "cursor-pointer btn-underline"
            : "cursor-not-allowed hover:text-current"
        }`}
      >
        {name ?? "Project Name"}
        {url ? (
          <FaArrowUpRightFromSquare className="w-3 h-3 ml-2 mb-0.5" />
        ) : null}
      </Button>
      <h2 className="mob:text-justify text-pretty text-lg laptop:text-xl opacity-50">
        {description ?? "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;
