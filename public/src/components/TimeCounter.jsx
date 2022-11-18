import React, { useEffect, useState } from 'react'

const TimeCounter = ({futureDate}) => {
    const [days, setDays] = useState('');
    const [hours, setHours] = useState('');
    const [mins, setMins] = useState('');
    const [secs, setSecs] = useState('');

    var x = setInterval(() => {
        const now = new Date().getTime();
        const distance = futureDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        setDays(days);
        setHours(hours);
        setMins(mins);
        setSecs(secs);
        if (distance < 1000) {
            clearInterval(x)
        }
    }, 1000);

    return (
        <div className="time-count">
            <div className="box">
                <div className="number">{days.toString().length > 1 ? days : '0'+days}</div>
                <div className="text">Days</div>
            </div>
            <div className="colon">:</div>
            <div className="box">
                <div className="number">{hours.toString().length > 1 ? hours : '0'+hours}</div>
                <div className="text">hours</div>
            </div>
            <div className="colon">:</div>
            <div className="box">
                <div className="number">{mins.toString().length > 1 ? mins : '0'+mins}</div>
                <div className="text">mins</div>
            </div>
            <div className="colon">:</div>
            <div className="box">
                <div className="number">{secs.toString().length > 1 ? secs : '0'+secs}</div>
                <div className="text">seconds</div>
            </div>
        </div>
    )
}

export default TimeCounter
