import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Gues The Price</title>
        <meta name='description' content='Guess The Price!!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='bg-gray-500'>Let's guess the price</div>
    </div>
  );
};

export default Home;
