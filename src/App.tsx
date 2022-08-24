import React from 'react';
import './App.css';
import {Link, Route, Routes} from 'react-router-dom';
import Templates from './components/Templates/Templates';
import Login from './components/Login/Login';
import Error404 from './components/Error404/Error404';
import Registration from './components/Registration/Registration';
import ResetPassword from './components/ResetPassword/ResetPassword';
import NewPassword from './components/ResetPassword/NewPassword/NewPassword';
import Profile from './components/Profile/Profile';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Link to={'/'}>Login</Link>
                <Link to={'/registration'}>Registration</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/Error404'}>404</Link>
                <Link to={'/reset'}>Reset pass</Link>
                <Link to={'/reset/new'}>New pass</Link>
                <Link to={'/templates'}>Templates</Link>
            </header>
            <div className={'content-wrapper'}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="registration" element={<Registration/>}/>
                    <Route path="reset" element={<ResetPassword/>}/>
                    <Route path="reset/new" element={<NewPassword/>}/>
                    <Route path="templates" element={<Templates/>}/>
                    <Route path='*' element={<Error404/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
