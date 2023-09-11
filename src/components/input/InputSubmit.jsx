import "./InputSubmit.css";
const InputSubmit = ({onClick=()=>{},text="확인"}) => {
    return <div className="InputSubmitWrapper" onClick={onClick} >{text}</div>
}
export default InputSubmit;