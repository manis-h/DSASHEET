import { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken,setShowRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    setToken(res.data.token);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Welcome Back</h2>
        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Login
          </button>
          <p className="text-center mt-4">
                        Don't have an account?{' '}
                        <button className="text-blue-600 underline" onClick={() => setShowRegister(true)}>
                          Register
                        </button>
                      </p>
        </div>
      </div>
      
    </div>
  );
}
