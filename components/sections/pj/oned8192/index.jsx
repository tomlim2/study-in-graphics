"use client";
import { useEffect, useState } from "react";
import "./SectionOned8192.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import OeSelector from "./components/ui/OeSelector";
const SectionOned8192 = () => {
  const [blueOrGreen, setBlueOrGreen] = useState([])
  const onClickButton = (e, selectorId) => {
    console.log("Button Clicked", e, selectorId)
  }


  useEffect(() => {
    let BGArray = [];
    for (let i = 0; i < 13; i++) {
      const randomAlg = Math.random()
      if (randomAlg > 0.5) {
        BGArray.push("blue")
      } else {
        BGArray.push("green")
      }
    }
    setBlueOrGreen(BGArray)

  }, [])

  const debugList = (BGArray) => {
    return BGArray.map((color, index) => {
      return (
        <li className="item" key={index}>
          <div className="item-info">
            <div>Round: {index}</div>
            <div>Answer: {color}</div>
          </div>
          <div><OeSelector round={index} onClickButton={onClickButton} /></div>
        </li>
      )
    })
  }

  return (
    <div className={"section"}>
      {blueOrGreen.length === 0 ?
        "" :
        <ul className="oe-debug-list">
          {debugList(blueOrGreen)}
        </ul>}
    </div>
  );
};

export default SectionOned8192;
