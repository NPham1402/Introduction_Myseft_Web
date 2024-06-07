import { set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { delay } from "../function/delay";
import { LightSpeed } from "react-reveal";

export default function Notification(props) {
  const { message } = props;
  const [showHide, setShowHide] = useState(true);
  useEffect(() => {
    delay(3000);
    setShowHide(false);
  }, []);
  return (
    <LightSpeed>
      <div className="absolute top-5 left-[40%] text-center  w-[20%] rounded-lg border h-[50px] bg-white text-black">
        <p className="pt-[12px]">{message}</p>
      </div>
    </LightSpeed>
  );
}
