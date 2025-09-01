import { useState } from 'react';
import axios from 'axios';

export default function Register({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post('https://dsasheet-production.up.railway.app/api/auth/register', { email, password });
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      setToken(res.data.token);
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-yellow-400">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Create an Account
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full mb-6"></div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            onChange={e => setConfirm(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold border-2 border-yellow-400 hover:from-blue-700 hover:to-blue-800 hover:border-yellow-500 transition duration-300 shadow-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-700 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
