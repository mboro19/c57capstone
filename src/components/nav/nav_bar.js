import { Link, Navigate, useNavigate } from "react-router-dom"



export const NavBar = () => {

    const navigate = useNavigate()

    return <>

    <Link align="left" to={"/profile"}>My Profile</Link>
    <button align="right" onClick={() => {navigate("http://localhost:3000")}}>Log Out</button>
    </>
}

