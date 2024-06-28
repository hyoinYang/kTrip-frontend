import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/reset.css";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import router from "./router";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchResultPage from "./pages/SearchResultPage";
import RecommendPage from "./pages/RecommendPage";
import SpotInfoPage from "./pages/SpotInfoPage";
import TourCoursePage from "./pages/TourCoursePage";

import Modal from "react-modal";
import { RouterProvider } from "react-router-dom";
import "./styles/root.css";
import Navbar from "./Navbar";

Modal.setAppElement("#root");
//Nav bar
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/recommend/area' element={<RecommendPage/>} />
                <Route path='/spotinfo' element={<SpotInfoPage/>} />
                <Route path = '/trip/search' element={<SearchResultPage/>} />
                <Route path ='/course' element={<TourCoursePage/>} />
            </Routes>
        </BrowserRouter>
);

reportWebVitals();
