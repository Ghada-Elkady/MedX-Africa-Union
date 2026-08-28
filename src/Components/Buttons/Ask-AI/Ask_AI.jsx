import { Link } from "react-router-dom"

const AskAI = () => {
    return (
        <Link to="/ask">
        <button className="neu-button fixed bottom-5 right-5 z-50 m-0 p-5 bg-white" style={{ width: "fit-content", padding: "10px 20px" }}> Ask AI<i className="fa-solid fa-message text-xl ml-2"></i></button>
        </Link>
            );
}
export default AskAI;
