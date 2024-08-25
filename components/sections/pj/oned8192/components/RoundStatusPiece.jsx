import { useEffect, useState } from "react";

const RoundStatusPiece = (props) => {
    const { assignedRound, assignedColor, currentRound } = props;
    const [statObject, setStatObject] = useState({ css: "", text: "-" });
    useEffect(() => {
        if (assignedRound < currentRound) {
            setStatObject({ css: `stat stat-done stat-${assignedColor}`, text: "x" })
        } else if (assignedRound === currentRound) {
            setStatObject({ css: "stat stat-now", text: "o" })
        } else if (assignedRound > currentRound) {
            setStatObject({ css: "stat stat-wait", text: "-" })

        }
    }, [assignedRound, currentRound, assignedColor])


    return (
        <li className={statObject.css}>
            {/* {statObject.text} */}
        </li>
    )
}

export default RoundStatusPiece;