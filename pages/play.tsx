/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Countdown from '../components/Countdown';
import NumberFormat from 'react-number-format';
import { useGame } from '../context/game';
import { GuessData, Product } from '../types';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function between(value, first, last) {
  let lower = Math.min(first, last),
    upper = Math.max(first, last);
  return value >= lower && value <= upper;
}

function pointCheck(reference, guess) {
  // if (reference === guess) {
  //   return 100;
  // } else if (between(guess, reference * 0.95, reference * 1.05)) {
  //   return 60;
  // } else if (between(guess, reference * 0.9, reference * 1.1)) {
  //   return 30;
  // }
  if (reference === guess) {
    return 100;
  } else if (between(guess, reference - 3, reference + 3)) {
    return 60;
  } else if (between(guess, reference - 6, reference + 6)) {
    return 30;
  }

  return 0;
}

const PlayPage = () => {
  const [guessedPrice, setGuessedPrice] = useState<{ value: string }>({ value: '0' });
  const { gameState, setGameState, points, setPoints } = useGame();
  const [product, setProduct] = useState<GuessData>(null);
  const [start, setStart] = useState(false);
  const [level, setLevel] = useState(1);
  const [endGame, setEndGame] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!start) {
      if (Object.keys(gameState).length > 0) {
        console.log('start game');
        setStart(true);
        const availableProducts = gameState.filter((dt: { guessed: boolean }) => !dt.guessed);
        if (availableProducts.length === 0) {
          setEndGame(true);
        } else {
          console.log('setting product');
          setProduct(availableProducts[Math.floor(Math.random() * availableProducts.length)]);
        }
      }
    }
  }, [start, gameState]);

  useEffect(() => {
    if (endGame) router.push('/leaderboard');
  }, [router, endGame]);

  useEffect(() => {
    setLevel(Object.keys(points).length);
  }, [points]);

  useEffect(() => {
    console.log('product changed', product);
  }, [product]);

  const sendGuessedPrice = () => {
    if (product) {
      // setProduct({
      //   ...product,
      //   guessed: true,
      //   guess: parseFloat(guessedPrice.value.replace('£', '')),
      // });
      const newProduct = {
        ...product,
        guessed: true,
        guess: parseFloat(guessedPrice.value.replace('£', '')),
      };
      const pc = pointCheck(newProduct.guess, newProduct.price);
      if (pc === 100) {
        toast.success('Impressive. That was exact!', {
          position: 'bottom-center',
          autoClose: 2000,
        });
      } else if (pc === 60 || pc === 30) {
        toast.success('That was close. Good job!', {
          position: 'bottom-center',
          autoClose: 2000,
        });
      } else {
        if (newProduct.price > newProduct.guess) {
          toast.error('Oops, your guess was too low. Keep trying', {
            position: 'bottom-center',
            autoClose: 2000,
          });
        } else {
          toast.error('Oops, your guess was too high. Keep trying', {
            position: 'bottom-center',
            autoClose: 2000,
          });
        }
      }
      setPoints({ ...points, [newProduct.id]: pc });
      const products = gameState.filter((el: Product) => el.id !== newProduct?.id ?? null);
      setGuessedPrice({ value: '' });
      setGameState([...products, newProduct]);
      setStart(false);
    }
  };

  useEffect(() => {
    console.log('gp', guessedPrice);
  }, [guessedPrice]);

  const timeOut = () => {
    console.log('finished due to timeout');
    sendGuessedPrice();
  };
  return (
    <div className='flex flex-col w-screen h-screen justify-start items-center p-2 overflow-y-scroll overflow-x-hidden'>
      <Navbar timeOut={timeOut} level={level} />
      <div className='w-full px-2 my-3'>
        <div className='bg-gray-300  text-center font-bold text-2xl w-full py-2 rounded-lg shadow-gray-900 shadow-md'>
          {product?.name ?? ''}
        </div>
      </div>
      <div className='my-4'>
        {product?.image && (
          <Image
            priority
            className='rounded-2xl'
            src={product?.image ?? ''}
            alt='play image'
            width={190}
            height={246}
          />
        )}
      </div>
      <div className='bg-grayBase flex flex-col py-4 px-8 items-center rounded-lg'>
        <span className='my-2 font-extrabold text-4xl'>Guess The Price</span>
        <div className='flex justify-center items-center my-2'>
          <NumberFormat
            value={guessedPrice.value === '0' ? '' : guessedPrice.value}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              setGuessedPrice({ value: formattedValue });
              document.getElementById('btn').focus();
            }}
            className='w-56 py-3  outline-none text-mnsSecondary rounded-3xl text-center font-bold text-4xl'
            thousandSeparator={true}
            prefix={'£'}
          />
        </div>
        <button
          id='btn'
          disabled={guessedPrice.value === '0' || guessedPrice.value === ''}
          onClick={() => sendGuessedPrice()}
          className={`${
            guessedPrice.value === '0' || guessedPrice.value === ''
              ? 'button-primary-disabled'
              : 'button-primary shadow-mnsSecondary shadow-md'
          } my-2 font-bold`}
        >
          Next
        </button>
      </div>
      {/* <span>{product?.price ?? 0}</span> */}
    </div>
  );
};

const Navbar = ({ timeOut, level }) => {
  const { total } = useGame();

  return (
    <div className='my-4 w-full grid grid-cols-3 grid-rows-1 items-center gap-4'>
      <div className='flex justify-center w-full h-full'>
        <div className='flex justify-center items-center relative h-full w-full text-center'>
          <span className='z-10 text-gray-900 font-bold text-2xl'>{total}</span>
          <div className='absolute top-1'>
            <svg
              width='76'
              height='77'
              viewBox='0 0 76 77'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='36.5' cy='40.5' r='36.5' fill='#005640' />
              <rect x='1' y='58' width='71' height='18' rx='5' fill='#005640' />
              <circle cx='39.5' cy='36.5' r='36.5' fill='#BDD755' />
              <circle cx='39.5' cy='36.5' r='27.5' fill='#E8FFE9' />
              <rect x='4' y='55' width='71' height='18' rx='5' fill='#BDD755' />
              <path
                d='M24.245 65.98C23.825 66.4 23.325 66.725 22.745 66.955C22.175 67.185 21.605 67.3 21.035 67.3C20.465 67.3 20.08 67.25 19.88 67.15L19.415 69.7L16.37 70L18.44 59.35L20.885 59.095L20.69 60.13C21.11 59.42 21.755 59.065 22.625 59.065C23.605 59.065 24.355 59.38 24.875 60.01C25.335 60.58 25.565 61.3 25.565 62.17C25.565 63.04 25.45 63.785 25.22 64.405C24.99 65.025 24.665 65.55 24.245 65.98ZM20.06 66.16C20.27 66.34 20.505 66.43 20.765 66.43C21.025 66.43 21.23 66.38 21.38 66.28C21.53 66.18 21.66 66.03 21.77 65.83C22.07 65.29 22.34 64.2 22.58 62.56C22.65 62.08 22.685 61.605 22.685 61.135C22.685 60.665 22.63 60.355 22.52 60.205C22.42 60.055 22.27 59.98 22.07 59.98C21.46 59.98 21.055 60.575 20.855 61.765L20.06 66.16ZM29.7389 67.3C27.5389 67.3 26.4389 66.265 26.4389 64.195C26.4389 62.725 26.8439 61.515 27.6539 60.565C28.5139 59.555 29.6889 59.05 31.1789 59.05C32.2589 59.05 33.0739 59.3 33.6239 59.8C34.1739 60.3 34.4489 61.075 34.4489 62.125C34.4489 63.725 34.0189 64.99 33.1589 65.92C32.3189 66.84 31.1789 67.3 29.7389 67.3ZM30.1289 60.775C30.0089 61.045 29.8989 61.385 29.7989 61.795C29.7089 62.195 29.6039 62.715 29.4839 63.355C29.3639 63.995 29.3039 64.71 29.3039 65.5C29.3039 65.76 29.3439 65.975 29.4239 66.145C29.5139 66.315 29.6739 66.4 29.9039 66.4C30.1339 66.4 30.3189 66.345 30.4589 66.235C30.6089 66.125 30.7389 65.94 30.8489 65.68C31.0489 65.22 31.2289 64.565 31.3889 63.715C31.5489 62.855 31.6339 62.24 31.6439 61.87C31.6639 61.5 31.6739 61.18 31.6739 60.91C31.6739 60.63 31.6339 60.4 31.5539 60.22C31.4739 60.04 31.3189 59.95 31.0889 59.95C30.8689 59.95 30.6839 60.02 30.5339 60.16C30.3839 60.3 30.2489 60.505 30.1289 60.775ZM38.9312 66.175C38.6212 66.925 37.9712 67.3 36.9812 67.3C36.4712 67.3 36.0562 67.125 35.7362 66.775C35.4662 66.465 35.3312 66.155 35.3312 65.845C35.3312 65.035 35.5162 63.84 35.8862 62.26L36.4412 59.35L39.4862 59.05L38.5712 63.79C38.4012 64.53 38.3162 65.03 38.3162 65.29C38.3162 65.86 38.5212 66.155 38.9312 66.175ZM36.7112 57.265C36.7112 56.875 36.8712 56.575 37.1912 56.365C37.5212 56.155 37.9212 56.05 38.3912 56.05C38.8612 56.05 39.2362 56.155 39.5162 56.365C39.8062 56.575 39.9512 56.875 39.9512 57.265C39.9512 57.655 39.7912 57.95 39.4712 58.15C39.1612 58.35 38.7712 58.45 38.3012 58.45C37.8312 58.45 37.4462 58.35 37.1462 58.15C36.8562 57.95 36.7112 57.655 36.7112 57.265ZM46.5541 67.3C45.3441 67.3 44.7391 66.83 44.7391 65.89C44.7491 65.63 44.7941 65.28 44.8741 64.84L45.1441 63.46C45.4141 62.16 45.5491 61.365 45.5491 61.075C45.5491 60.495 45.3791 60.205 45.0391 60.205C44.4691 60.205 44.0341 60.95 43.7341 62.44L42.8491 67L39.8341 67.3L41.3941 59.335L43.8541 59.05L43.6141 60.52C44.0841 59.54 45.0391 59.05 46.4791 59.05C47.1791 59.05 47.6741 59.2 47.9641 59.5C48.2641 59.79 48.4141 60.265 48.4141 60.925C48.4141 61.545 48.2541 62.58 47.9341 64.03C47.7841 64.68 47.7091 65.13 47.7091 65.38C47.7091 65.62 47.7741 65.81 47.9041 65.95C48.0441 66.09 48.2141 66.17 48.4141 66.19C48.3141 66.53 48.0891 66.8 47.7391 67C47.3991 67.2 47.0041 67.3 46.5541 67.3ZM49.8534 65.5C49.8534 65.23 49.9234 64.755 50.0634 64.075L50.8584 60.025H49.9734L50.0334 59.575C51.2334 59.215 52.4134 58.595 53.5734 57.715H54.2934L53.9334 59.35H55.1034L54.9684 60.025H53.8134L53.0484 64.075C52.9184 64.695 52.8534 65.11 52.8534 65.32C52.8534 65.8 53.0634 66.09 53.4834 66.19C53.3834 66.53 53.1534 66.8 52.7934 67C52.4334 67.2 51.9984 67.3 51.4884 67.3C50.9784 67.3 50.5784 67.14 50.2884 66.82C49.9984 66.5 49.8534 66.06 49.8534 65.5ZM59.5183 61.735C59.6583 61.365 59.7283 61.02 59.7283 60.7C59.7283 60.11 59.4883 59.815 59.0083 59.815C58.7583 59.815 58.5283 59.93 58.3183 60.16C58.1183 60.38 58.0183 60.63 58.0183 60.91C58.0183 61.11 58.0983 61.29 58.2583 61.45C58.4883 61.67 58.8983 61.96 59.4883 62.32C60.0783 62.68 60.4833 63.01 60.7033 63.31C60.9333 63.6 61.0483 63.95 61.0483 64.36C61.0483 64.76 60.9483 65.145 60.7483 65.515C60.5583 65.885 60.2883 66.2 59.9383 66.46C59.1883 67.02 58.2133 67.3 57.0133 67.3C56.3633 67.3 55.7883 67.13 55.2883 66.79C54.7883 66.46 54.5383 66.1 54.5383 65.71C54.5383 65.32 54.6783 65.01 54.9583 64.78C55.2483 64.55 55.6033 64.435 56.0233 64.435C56.4433 64.435 56.7833 64.515 57.0433 64.675C56.9133 65.005 56.8483 65.28 56.8483 65.5C56.8483 66.16 57.1283 66.49 57.6883 66.49C57.9283 66.49 58.1283 66.415 58.2883 66.265C58.4483 66.115 58.5283 65.91 58.5283 65.65C58.5283 65.14 58.0983 64.615 57.2383 64.075C56.5383 63.615 56.1083 63.295 55.9483 63.115C55.6783 62.795 55.5433 62.435 55.5433 62.035C55.5433 61.635 55.6383 61.245 55.8283 60.865C56.0183 60.485 56.2883 60.16 56.6383 59.89C57.3683 59.33 58.3683 59.05 59.6383 59.05C60.2883 59.05 60.8033 59.18 61.1833 59.44C61.5733 59.7 61.7683 60.05 61.7683 60.49C61.7683 60.93 61.6333 61.275 61.3633 61.525C61.1033 61.775 60.7333 61.9 60.2533 61.9C59.9233 61.9 59.6783 61.845 59.5183 61.735Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      </div>
      <Countdown timeOut={timeOut} level={level} />
    </div>
  );
};
export default PlayPage;
