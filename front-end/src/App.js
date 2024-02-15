import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/index.js";
import CodeReviewerDashboard from "./CodeReviewerDashboard/index.js";
import Homepage from "./Homepage/index.js";
import Login from "./Login/index.js";
import PrivateRoute from "./PrivateRoute/index.js";
import AssignmentView from "./AssignmentView/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CodeReviewerAssignmentView from "./CodeReviewerAssignmentView/index.js";
import { useUser } from "./UserProvider/index.js";
import AdminDashboard from "./AdminDashboard/index.js";
import AdminUserCreationView from "./AdminUserCreationView/index.js";

function App() {
  const user = useUser();
  const [roles, setRoles] = useState(getRolesFromJwt());

  useEffect(() => {
    setRoles(getRolesFromJwt());
  }, [user.jwt])

  function getRolesFromJwt() {
    // get role from jwt and assign via setRole;
    if (user.jwt) {
      const decodedJwt = jwtDecode(user.jwt);
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
          ) : roles.find((role) => role === "ROLE_ADMIN") ? (
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:assignmentId"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerAssignmentView />
            </PrivateRoute>
          ) : roles.find((role) => role === "ROLE_ADMIN") ? (
            <PrivateRoute>
            <AdminUserCreationView />
          </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/users/:userId" element={(
          <PrivateRoute>
            <AdminUserCreationView />
          </PrivateRoute>
        )}>
      </Route>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
