'use client';
import { useState } from 'react';
import { auth } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Use next/navigation
import Navbar from '../../../components/navbar';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state for the user's name
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state at the start

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save the user's name in local storage
      localStorage.setItem('userName', name);
      alert('Registration successful! You can now log in.');
      router.push('/login'); // Redirect to login page after registration
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Redirecting to Login page...');
        setTimeout(() => {
          router.push('/login');
        }, 10000);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '300px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button
              type="submit"
              style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Register
            </button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
