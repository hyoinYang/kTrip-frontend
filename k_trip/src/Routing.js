import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReviewLoad from "./pages/ReviewLoad";
import Navbar from "./Navbar";
import ReviewModal from "./modals/ReviewModal";


function Routing(){
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path = '' element={<ReviewLoad/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Routing;
