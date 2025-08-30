import React from "react";

export default function WhatIDoCompoent(props) {
  const { jobs, des1, des2 } = props;
  return (
    <div className=" w-1/2 mr-[10px]  text-[30x]">
      <CgWebsite color="#04b4e0" className="mb-1" size={40} />
      <span className=" font-bold">{jobs}</span>
      <ul className="list-disc">
        <li>{des1}</li>
        <li>{des2}</li>
      </ul>
    </div>
  );
}
