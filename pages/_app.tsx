import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { GameContext } from '../context/game';
import '../styles/globals.css';
import { GuessData, Product } from '../types';

const data = [
  {
    id: 'P60515662',
    name: '5pk Percy Pig™ Socks Gift Box',
    description:
      'Step out in style with these smart leather-look trainers. Round-toe design with a contrast sole. Lace-up fastening. Made with vegan-friendly materials.',
    image: 'https://asset1.marksandspencer.com/is/image/mandstest/SD_03_T03_0035_Z0_X_EC_0.png',
    categories: ['test'],
    price: 15,
  },
  {
    id: 'P60371466',
    name: 'Lace-Up Trainers',
    description:
      "These cotton-rich Percy Pig™ socks will make the perfect Christmas present. They're made with added stretch for total comfort. Gift box includes knitted and embroidered Percy Pig™ designs. All feature the Percy Pig™ logo on the soles and contrast heels and toes. \\n M&S Collection: easy-to-wear wardrobe staples that combine classic and contemporary styles.",
    image: 'https://asset1.marksandspencer.com/is/image/mandstest/SD_03_T03_0035_Z0_X_EC_0.png',
    categories: ['test'],
    price: 35,
  },
  {
    id: 'P60370104',
    name: 'Super Lightweight Chino Shorts',
    description:
      'Invest in a wear-with-anything piece this season with these versatile chino shorts. Classic cut with a button and zip fastening. Made from breathable cotton. All of the cotton for our clothing is sustainably sourced and always will be.',
    image: 'https://asset1.marksandspencer.com/is/image/mandstest/SD_03_T17_7720M_V0_X_EC_0.png',
    categories: ['test'],
    price: 25,
  },
  {
    id: 'P22491941',
    name: 'Pure Cashmere Crew Neck Jumper',
    description:
      'Our classic jumper is 100% soft cashmere with a luxuriously textured finish. Regular fit crew style with rounded neck. Machine washable for ease of care. From our Autograph range.',
    image: 'https://asset1.marksandspencer.com/is/image/mandstest/SD_01_T38_3390_K0_X_EC_0.png',
    categories: ['test'],
    price: 79,
  },
  {
    id: 'P60267024',
    name: 'Slim Fit Stretch Trousers',
    description:
      'Your 9-to-5 wardrobe will work overtime with these versatile trousers. The slim fit sits a little closer to your legs, creating a streamlined shape. Flat front design. Added stretch for comfort and easy movement. Finished with a button and zip fastening.',
    image: 'https://asset1.marksandspencer.com/is/image/mandstest/SD_03_T70_4233F_Y0_X_EC_0.png',
    categories: ['test'],
    price: 29,
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  const [gameState, setGameState] = useState<GuessData[]>([]);
  const [points, setPoints] = useState({});

  useEffect(() => {
    console.log('setting initial values');
    setGameState(
      data.map((dt: Product) => {
        return { ...dt, guessed: false, guess: 0 };
      })
    );
  }, []);

  useEffect(() => {
    console.log('state', gameState);
  }, [gameState]);

  return (
    <GameContext.Provider value={{ gameState, setGameState, points, setPoints }}>
      <div className='font-sahitya'>
        <Component {...pageProps} />
      </div>
    </GameContext.Provider>
  );
}

export default MyApp;
