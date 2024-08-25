const OeButton = (props) => {
    const onButtonClick = (e) => {
        props.onClickButton(e, props.round, props.choose);
    }
    return (
        <button className={`o8_button${" button_"+props.choose}`} onClick={(e)=>onButtonClick(e)}>{props.choose}</button>
    )
}

export default OeButton;