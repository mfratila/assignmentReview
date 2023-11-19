import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/index.js";
import Homepage from "./Homepage/index.js";
import Login from "./Login/index.js";
import PrivateRoute from "./PrivateRoute/index.js";

function App() {

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
