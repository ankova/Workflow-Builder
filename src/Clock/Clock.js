import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Clock = () => {
    let [currentTime, setCurrentTime] = useState(moment());

    /* Set a state update on every second */

    const update = () => {
        setInterval(() => {
            setCurrentTime(moment())
        }, 1000);
    }

    useEffect(() => {
        update();

        /* Clear interval when component unmounts */
        return clearInterval(update);
    }, []);

    return (
        <div className="Clock">
            <h3>
                {currentTime.format("HH:mm:ss.S")}
            </h3>
        </div>
    )
}

export default Clock;