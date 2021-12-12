import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

function ProtectedRoute({ component: Component }) {
  const { loggedInUser } = useContext(AuthContext);
  console.log(loggedInUser);
  if (loggedInUser.user.id) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
