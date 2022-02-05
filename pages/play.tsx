import React from 'react';
import Image from 'next/image';
import Countdown from '../components/Countdown';

const play = () => {
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center'>
      <h1 className='text-2xl font-bold '>Guess The Price!</h1>
      <Countdown />
      <div className='my-4'>
        <Image
          className='rounded-2xl'
          src='https://asset1.marksandspencer.com/is/image/mandstest/SD_03_T03_0035_Z0_X_EC_0.png'
          alt='play image'
          width={289}
          height={375}
        />
      </div>
    </div>
  );
};

export default play;
