// import React, { useState } from 'react';
// import LandingPage from './pages/LandingPage';
// import SignIn from './pages/SignIn';
// import Dashboard from './components/Dashboard';

// const App = () => {
//   const [page, setPage] = useState('landing'); // 'landing' | 'signin' | 'dashboard'
//   const [user, setUser] = useState(null);

//   const handleLogin = (email, password) => {
//     if (email === 'admin@psu' && password === 'admin') {
//       setUser({ email });
//       setPage('dashboard');
//     } else {
//       alert('Invalid credentials. Try: admin@psu.edu.ph / admin123');
//     }
//   };


//   return (
//     <>
//       {page === 'landing' && <LandingPage onSignIn={() => setPage('signin')} />}
//       {page === 'signin' && <SignIn onLogin={handleLogin} onBack={() => setPage('landing')} />}
//       {page === 'dashboard' && <Dashboard user={user} onLogout={() => setPage('landing')} />}
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import Dashboard from './components/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [checkingRole, setCheckingRole] = useState(false);

  const { loginUser, logoutUser } = useAuth();

  // Redirect based on role immediately after login
  useEffect(() => {
    if (user && checkingRole) {
      console.log('User:', user);
      console.log('User Role:', user.role);
      
      const role = user.role?.trim() || '';
      console.log('Checking role:', role);
      
      setCheckingRole(false);
      
      if (role === 'System Administrator') {
        console.log('Redirecting to admin-dashboard');
        setPage('admin-dashboard');
      } else if (role === 'Campus-Level User') {
        console.log('Redirecting to dashboard');
        setPage('dashboard');
      } else {
        console.log('Default: Redirecting to dashboard');
        setPage('dashboard');
      }
    }
  }, [user, checkingRole]);

  const handleLogin = async (email, password) => {
    const { user, error } = await loginUser(email, password);

    if (error) {
      // Error - return false without setting loading state
      // The SignIn component will handle showing the error modal
      return false;
    }

    // Success - set user and trigger role check
    setCheckingRole(true);
    setUser(user);
    return true;
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setPage('signin');
    setCheckingRole(false);
  };

  return (
    <>
      {page === 'landing' && <LandingPage onSignIn={() => setPage('signin')} />}

      {page === 'signin' && !checkingRole && (
        <SignIn onLogin={handleLogin} onBack={() => setPage('landing')} />
      )}

      {checkingRole && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      )}

      {page === 'dashboard' && !checkingRole && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}

      {page === 'admin-dashboard' && !checkingRole && (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;
