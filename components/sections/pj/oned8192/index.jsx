"use client";
import { useEffect, useState } from "react";
import "./SectionOned8192.scss";
import { Player } from "@lottiefiles/react-lottie-player";

const SectionOned8192 = () => {
  const [blueOrGreen, setBlueOrGreen] = useState([""])
  useEffect(() => {
    let BGArray = [];
    for(let i = 0; i < 13; i ++){
      const randomAlg = Math.random()
      if(randomAlg > 0.5) {
        BGArray.push("blue")
      } else{
        BGArray.push("green")
      }
    }
    setBlueOrGreen(BGArray)
    
  },[])


  return (
    <div className={"section"}>
      {blueOrGreen === 'none'? "" : blueOrGreen}
    </div>
  );
};

export default SectionOned8192;
