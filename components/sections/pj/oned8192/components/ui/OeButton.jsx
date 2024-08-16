const OeButton = (props) => {
    const onButtonClick = (e) => {
        props.onClickButton(e, props.selectorId);
    }
    return (
        <button className="o8_button" onClick={(e)=>onButtonClick(e)}>{props.text}</button>
    )
}

export default OeButton;