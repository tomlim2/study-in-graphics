import OeButton from "./OeButton";

const OeSelector = (props) => {
    return (
        <ul className="o8_selector">
            <li>
                <OeButton round={props.round} onClickButton={props.onClickButton} choose="green" />
            </li>
            <li>
                <OeButton round={props.round} onClickButton={props.onClickButton} choose="blue" />
            </li>
        </ul>
    )
}
export default OeSelector;