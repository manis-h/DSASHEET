import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Login from './components/Login';
import Register from './components/Register';
import DSASheet from './components/DSASheet';

function App() {
  const [token, setToken] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const cookieToken = Cookies.get('token');
    if (cookieToken) setToken(cookieToken);
  }, []);

  return (
    <div>
      {!token ? (
        showRegister ? (
          <>
            <Register setToken={setToken} setShowRegister={setShowRegister} />
            <p className="text-center mt-4">
              Already have an account?{' '}
              <button className="text-blue-600 underline" onClick={() => setShowRegister(false)}>
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <Login setToken={setToken} setShowRegister={setShowRegister} />
          </>
        )
      ) : (
        <>
          <DSASheet token={token} />
        </>
      )}
    </div>
  );
}

export default App;
