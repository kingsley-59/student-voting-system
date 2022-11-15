import React from 'react'
import { Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
import { Login, Register } from './pages/auth';
import { Error404, WebsiteMain, HomePage, VotePage, AdminPage, Roles, Contestants, Voters } from './pages/web'

const App = () => {
    return (
        <React.Fragment>
            <Alert />
            <Routes>
                <Route path='*' element={<Error404 />} />

                <Route path='/' element={<WebsiteMain />}>
                    <Route index element={<HomePage />}/>
                    <Route path='home' element={<HomePage />} />
                    <Route path='vote' element={<VotePage />} />
                    <Route path='admin' element={<AdminPage />}>
                        <Route index element={<Roles />} />
                        <Route path='roles' element={<Roles />} />
                        <Route path='contestants' element={<Contestants />} />
                        <Route path='voters' element={<Voters />} />
                    </Route>
                </Route>
                
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </React.Fragment>
    )
}

export default App