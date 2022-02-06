import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
const Home: NextPage = () => {
  return (
    <header className='relative flex items-center justify-center h-screen overflow-hidden'>
      <div className='relative z-30 p-5 text-2xl text-white bg-gray-900 h-full bg-opacity-50'>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='my-2'>
            <Image src='/media/logo_w.png' alt='m&s Logo' width={100} height={59} />
          </div>
          <div className='my-3 flex items-center justify-center'>
            <Image src='/media/shopping-bags.png' alt='shopping bags' width={60} height={42} />
            <span className='mx-2 font-bold text-white text-3xl'>Price It Right</span>
            <Image src='/media/goodies.png' alt='shopping bags' width={60} height={42} />
          </div>
          <div className='bg-gray-600 bg-opacity-90 p-4 text-center rounded-lg my-6'>
            <span className='opacity-100 text-white text-md'>
              The Time is Right. The Place is Right. So come on down and join M&S for a round of
              Price it Right!! Put on your shopping caps and showcase your pricing acumen in this
              series of Daily Challenges. All you need to do is give us your best guess on our set
              of products every day, and then hope to land on top of the leaderboard by the end of
              the week to win some exciting prizes!
            </span>
          </div>
          <Link href='/play'>
            <div className='button-primary'>Start</div>
          </Link>
        </div>
      </div>
      <video autoPlay loop muted className='absolute z-10 w-auto min-w-full min-h-full max-w-none'>
        <source src='/media/M&S_landing_background.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </header>
  );
};

export default Home;
