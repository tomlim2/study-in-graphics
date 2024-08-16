import OeButton from "./OeButton";

const OeSelector = (props) => {
    return (
        <ul className="o8_selector">
            <li>
                <OeButton selectorId={props.round + "Green"} onClickButton={props.onClickButton} text="Green" />
            </li>
            <li>
                <OeButton selectorId={props.round + "Blue"} onClickButton={props.onClickButton} text="Blue" />
            </li>
        </ul>
    )
}
export default OeSelector;