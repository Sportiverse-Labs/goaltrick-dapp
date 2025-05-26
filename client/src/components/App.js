import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';
import Perfil from './Perfil';
import Market from './Market';
import Message from './message';

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path='/feed' element={<Feed/>}/>
                        <Route path='/perfil' element={<Perfil/>}/>
                        <Route path='/market' element={<Market/>}/>
                        <Route path='/message' element={<Message/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;
