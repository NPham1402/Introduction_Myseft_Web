import React from "react";
import Jello from "react-reveal/Jello";
function ResumePage(props) {
  return (
    <Jello>
      <div className="w-full  h-full mt-auto align-middle min-h-[80vh]   bg-[#222] rounded-r-[30px] p-[60px] text-white">
        <span className="text-[32px]  font-semibold">RESUME</span>
        <br />

        <div className="w-full flex flex-row">
          <div className="w-8/12 ">
            <span className="text-[25px]  font-semibold">Education:</span>
            <p>2019-2024</p>
            <p className="text-[20px]">
              Ho Chi Minh City University of Foreign Languages and Information
              Technology (HUFLIT)
            </p>

            <li>Major: Information Technology </li>
            <li>GPA: 7,37/10</li>
            <div className="mt-[40px]" />
            <span className="text-[25px]   font-semibold">Experience:</span>
            <p>5/2024 - 05/2025</p>
            <p className="text-[20px]">
              FPT School of Business and Technology (FSB)
            </p>
            <ul className="text-[13x]">
              Developed web tools with Google Apps Script to streamline
              administrative tasks and automate reporting. Contributed to API
              integration for quarterly reports, managed institute facilities,
              and provided on-site technical assistance during events to ensure
              smooth operations.
            </ul>
          </div>
          <div className="w-4/12 "></div>
        </div>
      </div>
    </Jello>
  );
}

export default ResumePage;
