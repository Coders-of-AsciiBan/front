import { LinearProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useGame } from '../context/game';

const Countdown = ({}) => {
  const { gameState } = useGame();
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {}, []);
  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(10);
  }

  useEffect(() => {
    reset();
  }, [gameState]);

  useEffect(() => {
    let interval = setInterval(() => {});
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setIsActive(false);
    }
  }, [seconds]);

  return (
    <>
      <LinearProgress variant='determinate' value={((10 - seconds) * 100) / 10} />
      <div className='flex justify-center w-full'>
        <div className='semicircle font-extrabold' style={{ width: 70, height: 70 }}>
          <CircularProgressbar
            styles={buildStyles({
              // Colors
              pathColor: '#BDD755',
              textColor: '#000',
              trailColor: '#E8FFE9',
              backgroundColor: '#E8FFE9',
              textSize: '34px',
            })}
            minValue={0}
            maxValue={10}
            value={seconds}
            text={`${seconds}`}
          />
        </div>
      </div>
    </>
  );
};

export default Countdown;
