import { createBrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import ReviewLoad from "./pages/ReviewLoad";
import Navbar from "./Navbar";
import Login from "./Login";
import NotFound from "./NotFound";
import MyPage from "./MyPage";
import Trip from "./Trip";
import Register from "./Register";
// import ReviewModal from "./modals/ReviewModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "trip",
        element: <Trip />,
      },
      {
        path: "signup",
        element: <Register />,
      },
    ],

    // 존재하지 않는 라우터가 입력되는 경우, 오류 메시지를 출력한다.
    errorElement: <NotFound />,
  },
]);

export default router;
