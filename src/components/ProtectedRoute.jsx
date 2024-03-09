import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { chatToken } = useSelector((state) => state.auth);
  if (chatToken !== null) {
    return children;
  } else {
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  }
};

export default ProtectedRoute;
