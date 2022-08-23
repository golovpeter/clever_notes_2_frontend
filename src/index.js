import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./RegisterPage/RegisterPage";
import WelcomePage from "./WelcomePage/WelcomePage";
import LoginPage from "./LoginPage/LoginPage";
import NoMatchPage from "./NoMatchPage/NoMatchPage";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='*' element={<NoMatchPage/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

