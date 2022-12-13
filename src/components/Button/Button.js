import classes from './Button.module.css';

const Button = ({ text, btnClass, handleClick }) => {
  return (
    <button type="button" className={`${classes.button} ${classes[btnClass]}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
