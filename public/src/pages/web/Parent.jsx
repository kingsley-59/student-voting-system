import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../../components/Navbar'

const Parent = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Outlet />
        </React.Fragment>
    )
}

export default Parent