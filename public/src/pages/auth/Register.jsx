import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaInfoCircle, FaKey, FaUser } from 'react-icons/fa'
import { Input } from '../../components/FormRenders';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../components/Logo';
import { TYPES } from '../../redux/actions/types';
import { confirmRegNo, setPassword } from '../../redux/actions/auth';
import { validate } from '../../redux/actions/global';
const Register = () => {
    const { loading } = useSelector(state => state)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ regNo: '', password: '', cpassword: '' })
    const { regNo, password, cpassword } = userData

    const [page, setPage] = useState('confirmregno')
    const [scrollPage, setScrollPage] = useState(false)
    const [typePass, setTypePass] = useState(true)
    const [disabledConfirmRegNo, setDisabledConfirmRegNo] = useState(true)
    const [disabledSetPassword, setDisabledSetPassword] = useState(true)

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handlePasswordInput = (e) => {
        setUserData({ ...userData, password: e.target.value })
        validate.checkPasswordStrength.validate({ password })
    }

    const handleConfirmRegNo = async () => {
        if (loading.loadingConfirmRegNo) return;
        const response = await dispatch(confirmRegNo({ regNo }));
        if (response.status === 200) {
            dispatch({ type: TYPES.ALERT, payload: { success: 'Valid Registration Number!' } });
            setPage('setpassword');
            setScrollPage(!scrollPage)
        } else {
            dispatch({ type: TYPES.ALERT, payload: { info: response.data.msg } })
        }
    }

    const handleSetPassword = async () => {
        if (loading.loadingSetPassword) return;
        if (password !== cpassword) return dispatch({ type: TYPES.ALERT, payload: { info: 'Passwords don\'t match!' } });
        const response = await dispatch(setPassword({ regNo: regNo, password: password, cpassword: cpassword }));
        if (response.status === 200) {
            dispatch({ type: TYPES.ALERT, payload: { success: 'Registration Successful!' } });
            navigate('/login');
        } else {
            setScrollPage(!scrollPage)
            dispatch({ type: TYPES.ALERT, payload: { info: response.data.msg } })
        }
    }


    useEffect(() => {
        if (regNo || regNo.length >= 11) {
            setDisabledConfirmRegNo(false);
        } else {
            setDisabledConfirmRegNo(true)
        }

        if (password && cpassword) {
            setDisabledSetPassword(false)
        } else {
            setDisabledSetPassword(true)
        }
    }, [regNo, password, cpassword]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: 'smooth' })
    }, [scrollPage])
    return (
        <div className='page-main'>
            <Logo />

            {page === 'confirmregno' &&
                <div className="auth-box">
                    <div className="instruction">
                        <FaInfoCircle className='icon' />  Kindly enter your Registration number to set your Account Password.
                    </div>
                    <div className="auth-form">
                        <Input height='56px' inputType={'text'} value={regNo} name="regNo" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 2px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)' }} placeholder={'Registration Number...'} prefixIcon={<FaUser color='#000' />} prefixBgColor={'#eee'} />
                        <div className='mt-5'>
                            <button className='btn btn-animated' disabled={disabledConfirmRegNo} onClick={handleConfirmRegNo} > Continue </button>
                        </div>
                        <div className="after">
                            <div className="text">Already confirmed account? </div>
                            <Link to='/login' className="link">Login</Link>
                        </div>
                    </div>
                </div>
            }

            {page === 'setpassword' &&
                <div className="auth-box">
                    <div className="instruction">
                        <FaInfoCircle className='icon' />  Set up password for your Account.
                    </div>
                    <div className="auth-form">
                        <div id='password-strength-badge' className="password-strength-bagde"></div>
                        <div className="password-strength-info">
                            {validate.checkPasswordStrength.msg}
                        </div>
                        <Input height='50px' inputType={typePass ? 'password' : 'text'} value={password} name="password" onChange={handlePasswordInput} boxStyle={{ boxShadow: '0 0 2px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)' }} placeholder={'Password'} prefixIcon={<FaKey color='#000' />} prefixBgColor={'#eee'} suffixIcon={typePass ? <FaEye /> : <FaEyeSlash />} handleSuffixFunction={() => setTypePass(!typePass)} />
                        <Input height='50px' inputType={typePass ? 'password' : 'text'} value={cpassword} name="cpassword" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 2px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)', marginTop: '25px' }} placeholder={'Confirm Password'} prefixIcon={<FaKey color='#000' />} prefixBgColor={'#eee'} suffixIcon={typePass ? <FaEye /> : <FaEyeSlash />} handleSuffixFunction={() => setTypePass(!typePass)} />

                        <div className='mt-5'>
                            <button className='btn btn-animated' disabled={disabledSetPassword} onClick={handleSetPassword} > Set Password </button>
                        </div>
                        <div className="after">
                            <div className="text">Already confirmed account? </div>
                            <Link to='/login' className="link">Login</Link>
                        </div>
                    </div>
                </div>
            }

            <Link style={{ width: '200px' }} to='/home'>
                <div className='btn btn-animated'>Back to Home</div>
            </Link>
        </div>
    )
}

export default Register
