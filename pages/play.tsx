import React, { useState } from 'react';
import Image from 'next/image';
import Countdown from '../components/Countdown';
import NumberFormat from 'react-number-format';

const PlayPage = () => {
  const [guessedPrice, setGuessedPrice] = useState<{ value: string }>({ value: '0' });
  return (
    <div className='flex flex-col w-screen h-screen justify-start items-center p-4'>
      <h1 className='text-2xl font-bold'>Guess The Price!</h1>
      <div className='my-4'>
        <Countdown />
      </div>
      <div className='my-4'>
        <Image
          className='rounded-2xl'
          src='https://asset1.marksandspencer.com/is/image/mandstest/SD_03_T03_0035_Z0_X_EC_0.png'
          alt='play image'
          width={200}
          height={259}
        />
      </div>
      <span className='my-4'>How much does it cost?</span>
      <NumberFormat
        value={guessedPrice.value}
        onValueChange={(values) => {
          const { formattedValue, value } = values;
          setGuessedPrice({ value: formattedValue });
        }}
        className='border border-1 border-indigo-500 rounded-lg p-2'
        thousandSeparator={true}
        prefix={'£'}
      />
      <button className='button-primary my-4'>Confirm</button>
    </div>
  );
};

export default PlayPage;
