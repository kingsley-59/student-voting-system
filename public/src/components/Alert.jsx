import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TYPES } from '../redux/actions/types';
import { createPortal } from 'react-dom';
import { IoMdCheckmarkCircleOutline, IoMdInformationCircle } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa'
const Alert = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
        dispatch({ type: TYPES.ALERT, payload: {} })
    }

    useEffect(() => {
        if (alert.success || alert.info || alert.warning) {
            setOpen(true)
        }
        const timer = setTimeout(() => {
            handleClose()
        }, 5000)

        return () => clearTimeout(timer)
    }, [alert.success, alert.info, alert.warning])

    return createPortal(
        <React.Fragment>
            {open &&
                <div className='alert-container'>
                    {alert.info &&
                        <div className='alert-box info'>
                            <div><IoMdInformationCircle fontSize='25px' color='#fff' /></div>
                            <div className='wrapper'>
                                <div className='title'>{alert.title ? alert.title : 'Info'}</div>
                                <div className='msg'>{alert.info}</div>
                            </div>
                            <div className='close-icon' onClick={handleClose}>
                                <FaTimes fontSize='20px' />
                            </div>

                        </div>
                    }
                    {alert.success &&
                        <div className='alert-box success'>
                            <div><IoMdCheckmarkCircleOutline fontSize='25px' color='#fff' /></div>
                            <div className='wrapper'>
                                <div className='title'>{alert.title ? alert.title : 'Success'}</div>
                                <div className='msg'>{alert.success}</div>
                            </div>
                            <div className='close-icon' onClick={handleClose}>
                                <FaTimes fontSize='20px' />
                            </div>

                        </div>
                    }
                </div>
            }
        </React.Fragment>,
        document.getElementById('portal')
    )
}

export default Alert