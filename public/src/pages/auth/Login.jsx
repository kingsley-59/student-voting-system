import React, { useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import { FaEye, FaEyeSlash, FaKey, FaUser } from 'react-icons/fa'
import { Input } from '../../components/FormRenders';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { isVotingTime, loginUser } from '../../redux/actions/auth';
import TimeCounter from '../../components/TimeCounter';
import PageLoading from '../../components/PageLoading';
import { postDataAPI } from '../../utils/api';

const Login = () => {
    const { loading, auth } = useSelector(state => state)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ regNo: '', password: '' })
    const { regNo, password } = userData;

    const [typePass, setTypePass] = useState(true);
    const [disabledBtn, setDisabledBtn] = useState(true);

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = () => {
        if (loading.loggingIn) return;
        dispatch(loginUser({ regNo, password }));
    }
    useEffect(() => {
        if (regNo && password) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }, [password, regNo])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: 'smooth' })
    }, []);

    //Redirect if logged in...
    useEffect(() => {
        if (auth.token && auth.user && auth.user.role === 'user') {
            navigate('/vote');
        } else if(auth.token && auth.user && auth.user.role === 'admin'){
            navigate('/admin');
        }
    }, [auth.token, navigate])
    return (
        <div className='page-main'>
            {loading.pageLoading && <PageLoading />}

            {!loading.pageLoading &&
                <React.Fragment>
                    <Logo />

                    <div className="auth-box">
                        <div className="instruction" style={{ fontSize: '22px' }}>
                            Login to Vote!
                        </div>
                        <div className="auth-form">
                            <Input height='50px' inputType={'text'} value={regNo} name="regNo" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 10px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)' }} placeholder={'Registration number'} prefixIcon={<FaUser color='#000' />} prefixBgColor={'#eee'} />
                            <Input height='50px' inputType={typePass ? 'password' : 'text'} value={password} name="password" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 10px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)', marginTop: '25px' }} placeholder={'Account password'} prefixIcon={<FaKey color='#000' />} prefixBgColor={'#eee'} suffixIcon={typePass ? <FaEye /> : <FaEyeSlash />} handleSuffixFunction={() => setTypePass(!typePass)} />

                            <div className='mt-5'>
                                <button className='btn btn-animated' disabled={disabledBtn} onClick={handleSubmit} > Login to Account! </button>
                            </div>
                            <div className="after">
                                <div className="text">Not Registered Yet? </div>
                                <Link to='/register' className="link">Register</Link>
                            </div>
                        </div>
                    </div>

                    <Link style={{ width: '200px' }} to='/home'>
                        <div className='btn btn-animated'>Back to Home</div>
                    </Link>
                </React.Fragment>
            }
        </div>
    )
}

export default Login
