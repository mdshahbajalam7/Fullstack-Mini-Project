import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function PrivateRoute({ children }) {
  const { authState } = useContext(AuthContext);
  if (!authState.isAuth) {
    return <Navigate to={"/lognin"} />;
  }
  return children;
}

export default PrivateRoute;
