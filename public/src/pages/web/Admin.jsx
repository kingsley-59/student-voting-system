import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import PageLoading from '../../components/PageLoading';
import { refreshToken } from '../../redux/actions/auth';
import { FaUserAstronaut, FaUserCheck, FaUserFriends, FaUsersCog } from 'react-icons/fa'

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth, loading } = useSelector(state => state)
    //Redirect if not logged In!
    const redirectAway = async () => {
        const res = await dispatch(refreshToken({ message: 'Please Login to access the Admin Panel!' }))
        if (res.notLoggedIn) {
            navigate('/login')
        }
    }
    useEffect(() => {
        //redirectAway()
    }, []);

    return (
        <div className='page-main'>
            {loading.pageLoading && <PageLoading />}

            {!loading.pageLoading && auth.token &&
                <div className="main">
                    <div className="left">
                        <div className="instruction" style={{ fontSize: '20px', width: 'max-content', minWidth: '280px' }}>
                            <FaUserAstronaut style={{ marginRight: 5 }} />You're Logged In as Admin!
                        </div>
                        <div className="content">
                            <NavLink style={({ isActive }) => (isActive ? { background: '#eee', color: 'green',} : {})} to='/admin/roles'><FaUsersCog/>  Manage Roles</NavLink>
                            <NavLink style={({ isActive }) => (isActive ? { background: '#eee', color: 'green',} : {})} to='/admin/contestants'><FaUserCheck/> All Contestants</NavLink>
                            <NavLink style={({ isActive }) => (isActive ? { background: '#eee', color: 'green',} : {})} to='/admin/voters'> <FaUserFriends/>All Voters</NavLink>
                            <div className='mt-2 p-2' style={{borderTop:'1px solid #eee'}}>
                                <button className='btn btn-animated'>Commence Voting!</button>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Outlet />
                    </div>
                </div>
            }
        </div>
    )
}

export default Admin
