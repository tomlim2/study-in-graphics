"use client";
import { useEffect, useState } from "react";
import "./SectionOned8192.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import OeSelector from "./components/ui/OeSelector";
import { init } from "@dimforge/rapier3d-compat";
import { random } from "gsap";
import RoundStatusPiece from "./components/RoundStatusPiece";

const SectionOned8192 = () => {

  const [blueOrGreen, setBlueOrGreen] = useState([])
  const [selectColor, setSelectedColor] = useState([])
  const [currentRound, setCurrentRound] = useState(0)

  const setRandomGB = () => Math.random() > 0.5 ? "green" : "blue"
  const resetGame = () => {
    setCurrentRound(0)
    let newStatusArray = [...blueOrGreen]
    newStatusArray.forEach((status) => {
      status.answer = setRandomGB()
      status.step = "wait"
    })


    newStatusArray[0].step = "now"
    setBlueOrGreen(newStatusArray)
  }

  const onClickButton = (e, round, selectedColor) => {
    const isPassed = blueOrGreen[currentRound].answer === selectedColor
    const newStatusArray = [...blueOrGreen]
    if (isPassed) {
      let newRoundNow = currentRound + 1
      newStatusArray[currentRound].step = "passed"
      newStatusArray[newRoundNow].step = "now"
      setCurrentRound(newRoundNow)
    } else {
      newStatusArray[currentRound].step = "failed"
      resetGame()
    }


    setBlueOrGreen(newStatusArray)
  }

  const initGame = () => {
    let BGArray = [];
    let selectionStatus = {
      answer: "",
      step: "wait"
    }
    for (let i = 0; i < 13; i++) {
      selectionStatus = {
        round: i,
        answer: setRandomGB(),
        step: "wait"
      }
      BGArray.push(selectionStatus)
    }
    BGArray[0].step = "now"
    setBlueOrGreen(BGArray)
  }


  useEffect(() => {
    initGame()
  }, [])

  const debugList = (BGArray) => {
    return BGArray.map((status, index) => {
      return (
        <li className={`item${" status-" + status.step}`} key={index}>
          <div className="item-info">
            <div className="round-display">
              <div className="round-text">Total Round: 13</div>
              <div className="round-number">{status.round + 1}</div>
            </div>
            {/* <div>Answer: {status.answer}</div> */}
            {/* <div>Step: {status.step}</div> */}
          </div>
          <div className={`selector-wrapper ${status.step == "now" ? "" : "disable-selector"}`}>
            <OeSelector round={index} onClickButton={onClickButton} />
          </div>
        </li>
      )
    })
  }

  const progressBoard = (roundArray, currentRoundNumber) => {
    let listRound = roundArray

    return listRound.map((item, index) => {
      return (
        <RoundStatusPiece assignedRound={index} assignedColor={item.answer} key={index} currentRound={Number(currentRoundNumber)} />
      )
    })
  }

  return (
    <div className={"sectionOned8192"}>
      <div className="dec">
        1/8192 chance to win!!
      </div>
      <div className="card-wrapper">
        <div className="game-progress">
          <ul className="round-status">
            {progressBoard(blueOrGreen, currentRound)}
          </ul>
        </div>
        <div className="list-wrapper">
          {blueOrGreen.length === 0 ?
            "" :
            <ul className={`oe-debug-list`}>
              {debugList(blueOrGreen)}
            </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default SectionOned8192;
