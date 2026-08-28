import './Button.css'

const Button = ({ text , buttonStyle='neu-button'}) => {
  return (
    <button className={buttonStyle}>{text}</button>
  );
}

export default Button;
