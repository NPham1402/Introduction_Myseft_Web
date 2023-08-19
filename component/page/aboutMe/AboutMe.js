import dayjs from "dayjs";
import React from "react";
import Slide from "react-reveal/Slide";
function AboutMe(props) {
  const InforLine = ({ header, infor }) => {
    return (
      <p className={"text-[#04b4e0] mb-[10px] font-bold text-[15px] "}>
        {header}&nbsp; &nbsp;
        <span className="text-white">{infor}</span>
      </p>
    );
  };
  return (
    <Slide left>
      <div className="w-full   h-full mt-auto align-middle min-h-[80vh]   bg-[#222] rounded-r-[30px] p-[60px] text-white">
        <span className="text-[32px] font-semibold">ABOUT</span>
        <span className="text-[32px] text-[#04b4e0] font-semibold"> ME</span>
        <div className="flex flex-row mt-[20px]">
          <div className="w-7/12 mr-[10px] text-[15px] leading-[1.65rem] font-normal">
            Proin volutpat mauris pellentesque pharetra. Suspendisse congue elit
            vel odio suscipit, sit amet tempor nisl imperdiet. Quisque ex justo,
            faucibus ut mi in, condimentum finibus dolor. Aliquam vitae
            hendrerit dolor, eget imperdiet mauris. Maecenas et ante id ipsum
            condimentum dictum et vel massa. Ut in imperdiet dolor, vel
            consectetur dui.
          </div>
          <div className="w-5/12">
            <InforLine
              header={"Age"}
              infor={dayjs().diff(dayjs("2001-02-14"), "year")}
            />

            <InforLine header={"Residence"} infor={"Viet Nam"} />
            <InforLine header={"City"} infor={"Ho Chi Minh"} />
            <InforLine header={"Email"} infor={"npham140201@gmail.com"} />
            <InforLine header={"Phone"} infor={"+84938 224 718"} />
          </div>
        </div>
        <div className="mt-[50px]">
          <span className="text-[21px] font-semibold">WHAT I </span>
          <span className="text-[21px] text-[#04b4e0] font-semibold">DO</span>
        </div>
      </div>
    </Slide>
  );
}

export default AboutMe;
