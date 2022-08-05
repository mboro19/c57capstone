import { useNavigate } from "react-router-dom";
import "./navbar.css"

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
    
      <button
        className="logout--button"
        align="right"
        onClick={() => {
          navigate("http://localhost:3000");
        }}
      >
        Log Out
      </button>
      <button className="profile--button" onClick={() => {
          navigate("/profile")}}>
        My Profile
      </button>
    </>
  );
};
