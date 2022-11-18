import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import PageLoading from '../../components/PageLoading';
import TimeCounter from '../../components/TimeCounter';
import { isVotingTime, refreshToken } from '../../redux/actions/auth';
import img from '../../assets/images/logo.jpg'

const Vote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth, loading } = useSelector(state => state)
    const [page, setPage] = useState('vote')
    const [futureDate, setFutureDate] = useState('')
    const [voteData, setVoteData] = useState([
        {
            role: 'President',
            contestants: [
                { _id: '', name: 'Ajibo Chidera Promise', avatar: img },
                { _id: '', name: 'Akahibe Kingsley', avatar: img },
                { _id: '', name: 'Amadi Joshua', avatar: img }
            ]
        },
        {
            role: 'Vice-President',
            contestants: [
                { _id: '', name: 'Ajibo Chidera Promise', avatar: img },
                { _id: '', name: 'Akahibe Kingsley', avatar: img },
                { _id: '', name: 'Amadi Joshua', avatar: img }
            ]
        },
        {
            role: 'Financial Secretary',
            contestants: [
                { _id: '', name: 'Ajibo Chidera Promise', avatar: img },
                { _id: '', name: 'Akahibe Kingsley', avatar: img },
                { _id: '', name: 'Amadi Joshua', avatar: img }
            ]
        }
    ])

    //Check if it's set time to cast votes
    const isReady = async () => {
        const res = await dispatch(isVotingTime({}))
        if (res.status !== 200 || !res.data.isVotingTime) {
            setFutureDate(res.data.votingDate)
            setPage('getready')
        } else if (res.status === 200 && res.data.isVotingTime) {
            console.log(res.data.voteData)
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
        //redirectAway();
        //isReady();
    }, [])

    const handleSelect = (e) => {
        
    }

    return (
        <div className='page-main'>
            {loading.pageLoading && <PageLoading />}

            {!loading.pageLoading && auth.token &&
                <React.Fragment>
                    {page === 'vote' &&
                        <React.Fragment>
                            <div className="vote-card">
                                {voteData.map((data, i) => (
                                    <React.Fragment>
                                        <div className='role-title' key={i}>
                                            <div className="star">*</div>
                                            {data.role}
                                        </div>
                                        {data.contestants.map((contestant, i) => (
                                            <div key={i} className='contestant-data'>
                                                <input defaultChecked={true} onChange={handleSelect} type='checkbox' id={contestant.name} />
                                                <label htmlFor={contestant.name}><img className='avatar' src={contestant.avatar} alt='avatar' /></label>
                                                <label htmlFor={contestant.name} className="name">{contestant.name}</label>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        </React.Fragment>
                    }
                    {page === 'getready' &&
                        <React.Fragment>
                            <Logo />
                            <div className="auth-box">
                                <div className="voting-commences">
                                    Voting Commences In
                                </div>
                                <TimeCounter futureDate={futureDate} />
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
