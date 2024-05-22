import React from "react";
import { Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ViewCountry from "../pages/ViewCountry";
import ViewCity from "../pages/ViewCity";

function MyRouter(){

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/View/:id" element={<ViewCountry/>}/>
            <Route path="/ViewCity/:id" element={<ViewCity/>}/>
        </Routes>
    )
}

export default MyRouter;