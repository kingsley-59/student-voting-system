import React, { useRef } from 'react'
import { FaAddressCard, FaBars, FaBusinessTime, FaHome, FaTimes, FaUserAlt, FaUserAltSlash, FaUserAstronaut, FaUserCheck, FaUserFriends, FaUsersCog } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { SITE_LOGO } from '../config/constants';
import { logout } from '../redux/actions/auth';

const Navbar = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state)

	const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle('responsive-nav')
	}

	const handleLogOut = () => {
		dispatch(logout())
	}
	return (
		<header className='web-header'>
			<img src={SITE_LOGO} className='logo' alt='logo' />
			<nav className='web-nav' ref={navRef}>
				<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/home'><FaHome /> Home</NavLink>
				<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/event'><FaBusinessTime /> Event</NavLink>
				{!auth.token &&
					<React.Fragment>
						<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/register'><FaUserAlt fontSize={16} /> Register</NavLink>
						<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/login'><FaAddressCard /> Login</NavLink>
					</React.Fragment>
				}
				{auth.token &&
					<React.Fragment>
						{auth.user && auth.user.role === 'user' &&
							<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/vote'><FaAddressCard /> Vote</NavLink>
						}
						{auth.user && auth.user.role === 'admin' &&
							<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/admin'><FaUserAstronaut /> Admin Panel</NavLink>
						}
						<span className="show-mobile-only">
							{auth.user && auth.user.role === 'admin' &&
								<React.Fragment>
									<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)', marginBottom: '10px' } : { marginBottom: '10px' })} to='/admin/roles'><FaUsersCog/> Manage Roles</NavLink>
									<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)', marginBottom: '10px' } : { marginBottom: '10px' })} to='/admin/contestants'><FaUserCheck/> All Contestants</NavLink>
									<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)', marginBottom: '10px' } : { marginBottom: '10px' })} to='/admin/voters'> <FaUserFriends/> All Voters</NavLink>
								</React.Fragment>
							}
						</span>
						<Link onClick={handleLogOut}><FaUserAltSlash /> Sign Out</Link>
					</React.Fragment>
				}

				<button className='web-nav-btn web-nav-btn-close' onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<nav className='necessary-nav'>
				<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/home'>Home</NavLink>
				<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/event'>Event</NavLink>
				{!auth.token &&
					<React.Fragment>
						<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/register'> Register</NavLink>
						<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/login'>Login</NavLink>
					</React.Fragment>
				}
				{auth.token &&
					<React.Fragment>
						<NavLink onClick={showNavbar} style={({ isActive }) => (isActive ? { color: 'var(--siteGreen)' } : {})} to='/vote'><FaAddressCard /> Vote</NavLink>
					</React.Fragment>
				}
			</nav>
			<button className='web-nav-btn' onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	)
}

export default Navbar