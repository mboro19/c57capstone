import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/login.js"
import { Register } from "../auth/register.js"
import { Main } from "../main/main.js"

export const ApplicationViews = () => {

    
    return <Routes>
        
            
                
            

                <Route path="*" element={<Login />} />
                <Route path="register" element={<Register />} />
                    <Route path="main" element={<Main />} />
        
        
        

    </Routes>
    
}