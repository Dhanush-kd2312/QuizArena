'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const styles = {
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    textAlign: 'center',
    color: '#fff',
    padding: '20px',
  },
  button: {
    margin: '20px',
    color: 'black',
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
  },
};

export default function IntroJs() {

  return (
    <div style={styles.container}>
      <Image src='/img.jpeg' alt='Background' style={styles.background} layout='fill' />
      <h1>Welcome to QUIZ.COM</h1>
      <p>Thrive your knowledge by testing your IQ power through technical and non-technical FAQ</p>
      <div>
        <Link href='/login' style={styles.button}>Login</Link>
        <Link href='/register' style={styles.button}>Register</Link>
      </div>
    </div>
  );
}
