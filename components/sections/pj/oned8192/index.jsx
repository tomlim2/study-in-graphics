"use client";
import { useEffect, useState } from "react";
import "./SectionOned8192.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import OeSelector from "./components/ui/OeSelector";
const SectionOned8192 = () => {
  
  const [blueOrGreen, setBlueOrGreen] = useState([])
  const [selectedColor, setSelectedColor] = useState([])
  const onClickButton = (e, round, selectedColor) => {
    console.log("Button Clicked", e, round, selectedColor)
    let newArray = [...blueOrGreen]
    newArray[round].choice = selectedColor
    setSelectedColor(newArray)
  }


  useEffect(() => {
    let BGArray = [];
    let selectionStatus = {
      answer: "",
      step:"before-start"
    }
    for (let i = 0; i < 13; i++) {
      const randomAlg = Math.random()
      if (randomAlg > 0.5) {
        selectionStatus = {
          round: i,
          answer: "blue",
          step:"before-start"
        }
        BGArray.push(selectionStatus)
      } else {
        selectionStatus = {
          round: i,
          answer: "green",
          step:"before-start",
          choice: ""
        }
        BGArray.push(selectionStatus)
      }
    }
    setBlueOrGreen(BGArray)

  }, [])

  const debugList = (BGArray) => {
    return BGArray.map((status, index) => {
      return (
        <li className="item" key={index}>
          <div className="item-info">
            <div>Round: {status.round}</div>
            <div>Answer: {status.answer}</div>
            <div>Step: {status.step}</div>
            <div>Choice: {status.choice}</div>
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
