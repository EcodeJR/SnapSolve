import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Rules from './pages/Rules';
import LoadingPage from './components/LoadingPage.jsx';
import { useState } from 'react';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CookieConsent from './components/CookieConsent';
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingPage setIsLoaded={setIsLoaded} />}
      {isLoaded && (
        <>
            {/* Cookie consent outside BrowserRouter */}
            <CookieConsent darkMode={darkMode} />
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={darkMode ? "dark" : "light"}
          />
        <div className="flex flex-col min-h-screen overflow-hidden">
          {/* Background section */}
          <div className='fixed inset-0 bg-gradient-to-br from-white via-purple-50 to-yellow-50 font-[Montserrat Alternates]'>
            <div className='absolute inset-0'>
              <div className='absolute top-[20%] left-[10%] w-[40vw] h-[40vh] bg-purple-200/30 rounded-full mix-blend-multiply filter blur-[80px]'></div>
              <div className='absolute bottom-[20%] right-[10%] w-[40vw] h-[40vh] bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-[80px]'></div>
            </div>
          </div>

          {/* Main content */}
          <main className={`relative flex-1 z-10 ${darkMode ? 'dark' : ''}`}>
            <div className="min-h-screen backdrop-blur-sm">
              
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                  <Route path="/rules" element={<Rules />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          </main>
        </div>
        </>
      )}
    </>
  );
}

export default App
