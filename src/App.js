import React from 'react';
import {Route, Routes} from "react-router-dom";
import StartPage from "./pages/StartPage";
import FirstPage from "./pages/FirstPage";
import LayOut from "./pages/LayOut";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LayOut/>}>
                    <Route index element={<FirstPage/>}/>
                    <Route path='data/:WB/:token' element={<StartPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;