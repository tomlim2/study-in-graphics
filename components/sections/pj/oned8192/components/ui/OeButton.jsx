const OeButton = (props) => {
    const onButtonClick = (e) => {
        props.onClickButton(e, props.selectorId);
    }
    return (
        <button onClick={(e)=>onButtonClick(e)} className="o8_button">{props.text}</button>
    )
}

export default OeButton;