import React from 'react'
import { SITE_LOGO } from '../config/constants'

const Logo = () => {
    return (
        <React.Fragment>
            <div className="page-logo">
                <img src={SITE_LOGO} alt='logo' />
            </div>
            <div className="logo-name">
                <div className="nimeche">NiMechE</div>
                <div className="chapter"> FUTO Chapter </div>
            </div>
        </React.Fragment>
    )
}

export default Logo
