import React, { useState, useEffect } from "react";

const Timer = ({ mm, ss }) => {
  const [minutes, setMinutes] = useState(parseInt(0));
  const [seconds, setSeconds] = useState(parseInt(3));
  const [gameEnd, setgameEnd] = useState(true);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
          setgameEnd(false);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div>
      {gameEnd ? (
        <div>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      ) : (
        <button>다음단계</button>
      )}
    </div>
  );
};

export default Timer;
