"use client";
import { useEffect, useState } from "react";
import "./SectionOned8192.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import OeSelector from "./components/ui/OeSelector";
const SectionOned8192 = () => {

  const [blueOrGreen, setBlueOrGreen] = useState([])
  const [selectColor, setSelectedColor] = useState([])
  const [roundInProgress, setRoundInProgress] = useState(0)

  const resetGame = () => {
    setRoundInProgress(0)
    let newStatusArray = [...blueOrGreen]
    newStatusArray.forEach((status) => {
      status.step = "wait"
    })
    newStatusArray[0].step = "now"
    setBlueOrGreen(newStatusArray)
  }

  const onClickButton = (e, round, selectedColor) => {
    const isPassed = blueOrGreen[roundInProgress].answer === selectedColor
    const newStatusArray = [...blueOrGreen]
    if (isPassed) {
      let newRoundNow = roundInProgress + 1
      newStatusArray[roundInProgress].step = "passed"
      newStatusArray[newRoundNow].step = "now"
      setRoundInProgress(newRoundNow)
    } else {
      newStatusArray[roundInProgress].step = "failed"
      resetGame()
    }

    
    setBlueOrGreen(newStatusArray)
  }


  useEffect(() => {
    let BGArray = [];
    let selectionStatus = {
      answer: "",
      step: "wait"
    }
    for (let i = 0; i < 13; i++) {
      const randomAlg = Math.random()
      if (randomAlg > 0.5) {
        selectionStatus = {
          round: i,
          answer: "blue",
          step: "wait"
        }
        BGArray.push(selectionStatus)
      } else {
        selectionStatus = {
          round: i,
          answer: "green",
          step: "wait",
        }
        BGArray.push(selectionStatus)
      }
    }
    BGArray[0].step = "now"
    setBlueOrGreen(BGArray)

  }, [])

  const debugList = (BGArray) => {
    return BGArray.map((status, index) => {
      return (
        <li className={`item${" status-" + status.step}`} key={index}>
          <div className="item-info">
            <div>Round: {status.round}</div>
            {/* <div>Answer: {status.answer}</div> */}
            <div>Step: {status.step}</div>
          </div>
          <div className={` ${status.step == "now" ? "" : "disable-selector"}`}><OeSelector round={index} onClickButton={onClickButton} /></div>
        </li>
      )
    })
  }

  return (
    <div className={"section"}>
      <div className="">
        {/* <button>control</button> */}
      </div>
      {blueOrGreen.length === 0 ?
        "" :
        <ul className={`oe-debug-list`}>
          {debugList(blueOrGreen)}
        </ul>}
    </div>
  );
};

export default SectionOned8192;
