import styles from "./button.module.scss";

const ButtonBasic = ({
  to,
  onClick,
  onMouseEnter,
  children,
}) => {

  const clickButton = () => {
    if (onClick) {
      return onClick();
    }
    if (to) {
      return alert('on');
    }
  };

  const hoverOnButton = () => {
    if (onMouseEnter) {
      return onMouseEnter();
    }
  };

  return (
    <button
      className={styles.button}
      onClick={() => {
        clickButton();
      }}
      onMouseEnter={() => {
        hoverOnButton();
      }}
    >
      {children}
    </button>
  );
};

export default ButtonBasic;
