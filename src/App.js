import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Otp from "./pages/Otp";
import CreatePost from "./pages/CreatePost";

function App() {
  
  return (
    <div className="bg-black text-white min-h-screen">
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path ="/edit-profile" element={<EditProfile/>}/>
          <Route path ="/create-post" element={<CreatePost/>}/>
          <Route path ="/setting" element={<CreatePost/>}/>
        </Route>

        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element = {<SignUp/>}/>
        <Route path="/verify-email" element = {<Otp/>}/>
        <Route path="/forgot-password" element ={<ForgotPassword/>}/>
        <Route path="/reset-password/:id"  element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
