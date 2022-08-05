import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/login.js";
import { Register } from "../auth/register.js";
import { Main } from "../main/main.js";
import { MainAfter } from "../main/mainAfter.js";
import { Profile } from "../profile/profile.js";
import { NavBar } from "../nav/nav_bar.js";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="main" element={<><NavBar /><Main /></>} />
      <Route path="profile" element={<Profile />} />
      <Route path="mainAfter" element={<><NavBar /><MainAfter /></>} />
    </Routes>
  );
};
