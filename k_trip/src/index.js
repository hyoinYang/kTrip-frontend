import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from "./Navbar";
import Routing from "./Routing";

import Modal from 'react-modal';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchResultPage from "./pages/SearchResultPage";
import RecommendPage from "./pages/RecommendPage";
import SpotInfoPage from "./pages/SpotInfoPage";

Modal.setAppElement('#root');
//Nav bar
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/recommend/area' element={<RecommendPage/>} />
                <Route path='/spotinfo' element={<SpotInfoPage/>} />
                <Route path = '/trip/search' element={<SearchResultPage/>} />
            </Routes>
        </BrowserRouter>
);

reportWebVitals();
