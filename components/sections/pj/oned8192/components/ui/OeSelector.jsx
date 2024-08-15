import OeButton from "./OeButton";

const OeSelector = (props) => {
    return (
        <div className="o8_selector">
            <OeButton selectorId={props.round + "Green"} onClickButton={props.onClickButton} text="Green" />
            <OeButton selectorId={props.round + "Blue"} onClickButton={props.onClickButton} text="Blue" />
        </div>
    )
}
export default OeSelector;