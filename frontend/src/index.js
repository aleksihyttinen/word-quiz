import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentView from "./StudentView.js";
import TeacherView from "./TeacherView.js";
import Login from "./Login.js";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/student" element={<StudentView />}></Route>
      <Route path="/teacher" element={<TeacherView />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
