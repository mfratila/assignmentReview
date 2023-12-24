import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/index.js";
import CodeReviewerDashboard from "./CodeReviewerDashboard/index.js";
import Homepage from "./Homepage/index.js";
import Login from "./Login/index.js";
import PrivateRoute from "./PrivateRoute/index.js";
import AssignmentView from "./AssignmentView/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalState } from "./util/useLocalStorage.js";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import CodeReviewerAssignmentView from "./CodeReviewerAssignmentView/index.js";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJwt());

  function getRolesFromJwt() {
    // get role from jwt and assign via setRole;
    if (jwt) {
      const decodedJwt = jwtDecode(jwt);
      return decodedJwt.authorities;
    } else {
      return [];
    }
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:id"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
