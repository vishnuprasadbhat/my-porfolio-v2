import React from "react";
import Socials from "../Socials";

const Footer = ({ data }) => {
  return (
    <>
      <div className="p-2 laptop:p-0">
        <div>
          <h1 className="text-2xl text-bold">Contact.</h1>
          <div className="mt-5">
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              LET&apos;S WORK
            </h1>
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              TOGETHER
            </h1>
            <div className="mt-5 laptop:ml-2">
              <Socials data={data} />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-sm text-bold mt-2 laptop:my-10 p-2 laptop:p-0 text-center mob:mt-5">
        © Designed and built by Vishnu
      </h1>
    </>
  );
};

export default Footer;
