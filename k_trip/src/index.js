import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from "./Navbar";

import Modal from 'react-modal';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchResultPage from "./pages/SearchResultPage";
import RecommendPage from "./pages/RecommendPage";
import SpotInfoPage from "./pages/SpotInfoPage";
import TourCoursePage from "./pages/TourCoursePage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUpPage";
import ChangePassword from "./ChangePassword";

Modal.setAppElement('#root');
//Nav bar
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/'></Route>
                <Route path='/MyPage' element={<MyPage/>}/>
                <Route path='/recommend/area' element={<RecommendPage/>} />
                <Route path='/spotinfo' element={<SpotInfoPage/>} />
                <Route path = '/trip/search' element={<SearchResultPage/>} />
                <Route path ='/course' element={<TourCoursePage/>} />
                <Route path ='/login' element={<LoginPage/>} />
                <Route path ='/signup' element={<SignUpPage/>} />
                <Route path ='/mypage/password' element={<ChangePassword/>} />
            </Routes>
        </BrowserRouter>
);

reportWebVitals();
