import dayjs from "dayjs";
import React from "react";
import Slide from "react-reveal/Slide";
import { CgWebsite } from "react-icons/cg";
import { GrServerCluster } from "react-icons/gr";
import { IoIosCloud } from "react-icons/io";
import { FaDatabase } from "react-icons/fa";
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
      <div className="w-full overflow-auto  h-full mt-auto align-middle min-h-[80vh] max-h-[80vh]   bg-[#222] rounded-r-[30px] p-[60px] text-white">
        <span className="text-[32px] font-semibold">ABOUT</span>
        <span className="text-[32px] text-[#04b4e0] font-semibold"> ME</span>
        <div className="flex flex-row mt-[20px]">
          <div className="w-7/12 mr-[10px] text-[15px] leading-[1.65rem] font-normal">
            My personality is sociable, open-minded, and respectful, dedicated
            to work. My lifelong journey of overcoming a speech disorder
            condition demonstrates my exceptional resilience, effort and
            determination. While working, I definitely want to channel this
            drive into my work. My aim is to keep moving forward to sharpen my
            knowledge, skillset and have the opportunity to pursue my dreams of
            becoming an advance developer in the near future.
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
          <span className="text-[21px] font-semibold">What </span>
          <span className="text-[21px] text-[#04b4e0] font-semibold">I DO</span>
        </div>
        <div className="mt-[20px] mr-[10px]  leading-[1.65rem] font-normal">
          <div className="flex flex-row">
            <div className=" w-1/2 mr-[10px]  ">
              <CgWebsite color="#04b4e0" className="mb-1" size={50} />
              <div className="uppercase  font-bold">Frontend Development</div>
              <ul className="list-disc">
                <li>
                  Build responsive, user-friendly interfaces with frameworks
                  such as Next.js and React.js.
                </li>
                <li>
                  Create engaging UI with animations to enhance user experience.
                </li>
              </ul>
            </div>
            <div className=" w-1/2 mr-[10px]  ">
              <GrServerCluster color="#04b4e0" className="mb-1" size={50} />
              <div className="uppercase  font-bold">Backend Development</div>
              <ul className="list-disc">
                <li>
                  Develop and maintain APIs for frontend-backend communication.
                </li>
                <li>
                  Integrate multiple third-party services (e.g., delivery
                  services, authentication, payment).
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row mt-[10px]">
            <div className=" w-1/2 mr-[10px]  ">
              <IoIosCloud color="#04b4e0" className="mb-1" size={50} />
              <div className="uppercase  font-bold">Cloud & Performance</div>
              <ul className="list-disc">
                <li>
                  Handle multiple instances using reverse proxy powered by
                  Cloudflare Workers for load balancing and caching.
                </li>
                <li>Optimize system stability and scalability.</li>
              </ul>
            </div>
            <div className=" w-1/2 mr-[10px]  ">
              <FaDatabase color="#04b4e0" className="mb-1" size={50} />
              <div className="uppercase  font-bold">
                Database & System Optimization
              </div>
              <ul className="list-disc">
                <li>
                  work on database design, query optimization, and system
                  performance tuning to ensure applications run efficiently.
                </li>
                <li>
                  mplement caching strategies and monitoring tools to keep
                  systems stable and scalable.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default AboutMe;
