import React from 'react'
import { ERROR_GIF } from '../../config/constants'
import NavBar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const Error404 = () => {
	return (
		<React.Fragment>
			<NavBar />
			<div className='error-page'>
				<img src={ERROR_GIF} className='gif' alt='logo' />
				<p className='oops'>Ooops!</p>
				<p className='message'>The requested URL was not found on our servers!<br />
					Looks like you followed a bad link. 😖
				</p>
				<Link style={{width:'200px'}} to='/home'>
					<div className='btn btn-animated'>Back to Home</div>
				</Link>
			</div>
		</React.Fragment>
	)
}

export default Error404