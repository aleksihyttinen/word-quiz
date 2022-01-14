import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentView from "./StudentView.js";
import TeacherView from "./TeacherView.js";
import Login from "./Login.js";
import { ProvideAuth } from "./useAuth";
import { useAuth } from "./useAuth";

function RequireAuth({ children }) {
  //Get current auth status from useAuth hook and route accordingly
  const { isAuth } = useAuth();
  let auth = isAuth();
  //If authorized route to oroginal route, else route to login page
  return auth ? children : <Navigate to="/login" replace />;
}

ReactDOM.render(
  //Provide routes for different urls and render accordingly
  <ProvideAuth>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/student" element={<StudentView />}></Route>
        <Route
          path="/teacher"
          element={
            <RequireAuth>
              <TeacherView />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </ProvideAuth>,
  document.getElementById("root")
);
