import {useEffect, useState} from "react";

const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.deadline);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => {
                const newSeconds = prevSeconds - 1;
                if (newSeconds >= 0) {
                    return newSeconds;
                } else {
                    clearInterval(intervalId);
                    return 0;
                }
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <h1>{seconds}</h1>
        </div>
    );
}

export default Timer;