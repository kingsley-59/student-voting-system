import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'

const Modal = ({ open, setOpen, children, header, body }) => {

    return (
        <React.Fragment>
            <span onClick={() =>  setOpen(!open)}>{children}</span>
            {createPortal(
                <React.Fragment>
                    {open &&
                        <div className="web-modal">
                            <div className="container md">
                                <div className="header"> {header} <FaTimes className='close-icon' onClick={() => setOpen(false)} /></div>
                                <div className="body">{ body }</div>
                            </div>
                        </div>
                    }
                </React.Fragment>,
                document.getElementById('portal')
            )}

        </React.Fragment>
    )
}

export default Modal
