import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import PageLoading from '../../components/PageLoading';
import TimeCounter from '../../components/TimeCounter';
import { isVotingTime, refreshToken } from '../../redux/actions/auth';
import { TYPES } from '../../redux/actions/types';

const Vote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth, loading } = useSelector(state => state)
    const [page, setPage] = useState('')

    //Check if it's set time to cast votes
    const isReady = async () => {
        const res = await dispatch(isVotingTime({}))
        if (res.status !== 200 || !res.data.isVotingTime) {
            setPage('getready')
        } else {
            setPage('vote')
        }
    }
    //Redirect if not logged In!
    const redirectAway = async () => {
        const res = await dispatch(refreshToken({ message: 'Please Login to your Account to Vote!' }))
        if (res.notLoggedIn) {
            navigate('/login')
        }
    }
    useEffect(() => {
        //redirectAway()
        isReady();
    }, [])

    return (
        <div className='page-main'>
            {loading.pageLoading && <PageLoading />}

            {!loading.pageLoading && auth.token &&
                <React.Fragment>
                    {page === 'vote' &&
                        <React.Fragment>

                        </React.Fragment>
                    }
                    {page === 'getready' &&
                        <React.Fragment>
                            <Logo />
                            <div className="auth-box">
                                <div className="voting-commences">
                                    Voting Commences In
                                </div>
                                <TimeCounter />
                            </div>
                            <Link style={{ width: '200px' }} to='/home'>
                                <div className='btn btn-animated'>Back to Home</div>
                            </Link>
                        </React.Fragment>

                    }
                </React.Fragment>
            }
        </div>
    )
}

export default Vote
