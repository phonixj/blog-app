import classes from './Button.module.css';

const Button = ({ text, btnClass }) => {
  return (
    <button type="button" className={`${classes.button} ${classes[btnClass]}`}>
      {text}
    </button>
  );
};

export default Button;
