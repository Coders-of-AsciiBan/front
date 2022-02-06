import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import Image from 'next/image';
import useFormData from '../hooks/useFormData';
import { nanoid } from 'nanoid';

const lds = [
  { name: 'marks', points: 20 },
  { name: 'Spencer', points: 10 },
  { name: 'Foo', points: 10 },
  { name: 'Bar', points: 10 },
  { name: 'HTB', points: 10 },
  { name: 'X Æ A-Xii', points: 10 },
];

const Leaderboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [leaders, setLeaders] = useState(lds);
  return (
    <div className='p-4'>
      <div className='m-4 flex justify-around items-center'>
        <Image src='/media/congrats.png' alt='congratulations' width={75} height={74} />
        <span className='text-4xl font-bold'>Leaderboard</span>
      </div>
      <div className='my-4 border  b-2 border-black rounded-lg bg-lighterGreen'>
        {leaders.map((ld, index) => {
          return <Leader key={nanoid()} index={index} leader={ld} />;
        })}
      </div>
      <div className='p-3 text-xl'>
        <span>
          Well done! You are currently placed{' '}
          <span className='text-mnsSecondary font-bold'>4th</span>. come back tomorrow to increase
          your score
        </span>
      </div>
      <Dialog open={openDialog} className='rounded-lg'>
        <UserForm />
      </Dialog>
    </div>
  );
};

const Leader = ({ leader, index }) => {
  console.log(leader);
  return (
    <div className='flex items-center px-2 my-3'>
      <LeaderBadge index={index} />
      <div className='w-full mx-3 border-b-2 border-black flex justify-between items-end py-2'>
        <span className='text-2xl font-bold'>{leader.name}</span>
        <span className='text-xl font-bold text-mnsSecondary mx-5'>{leader.points} pts</span>
      </div>
    </div>
  );
};

const LeaderBadge = ({ index }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (index === 0) {
      setImage('/media/one.png');
    } else if (index === 1) {
      setImage('/media/two.png');
    } else if (index === 2) {
      setImage('/media/three.png');
    }
  }, [index]);

  if (index <= 2) {
    return <div>{image !== '' && <Image src={image} alt='medal' width={39} height={67} />}</div>;
  }
  return (
    <div className='w-10 flex justify-center text-4xl font-bold text-mnsSecondary'>{index + 1}</div>
  );
};

const UserForm = () => {
  const { formData, form, updateFormData } = useFormData(null);
  const submitForm = (e) => {
    e.preventDefault();
    console.log('formData', formData);
  };
  return (
    <div className='bg-gray-300 p-6'>
      <div className='test'>
        <Image src='/media/gift.png' alt='gift' height={196} width={196} />
      </div>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <div className='mt-20 flex flex-col items-center p-4'>
          <span className='font-bold text-3xl'>FINISHED</span>
          <span>Enter your details to see yout result</span>
          <label>
            <span>Name</span>
            <input required className='input' name='name' placeholder='Your Name' type='text' />
          </label>
          <label>
            <span>Email</span>
            <input
              required
              className='input'
              name='email'
              placeholder='the-best@marksandspencer.com'
              type='text'
            />
          </label>
          <button type='submit' className='button-primary shadow-mnsSecondary shadow-md my-4'>
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default Leaderboard;
