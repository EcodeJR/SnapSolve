import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Rules from './pages/Rules';
import LoadingPage from './components/LoadingPage.jsx';
import { useState } from 'react';
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
    {!isLoaded && <LoadingPage setIsLoaded={setIsLoaded} />}
    {isLoaded && <>
                <section className='w-full h-screen fixed top-0 left-0 bg-whiteMain font-[Montserrat Alternates]'>
                  <div className='w-[40vw] h-[30vh] md:w-[30vw] md:h-[30vh] lg:w-[20vw] lg:h-[50vh] bg-yellowMain absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full opacity-40'></div>
                  <div className='w-[40vw] h-[30vh] md:w-[30vw] md:h-[30vh] lg:w-[20vw] lg:h-[50vh] bg-yellowMain absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full opacity-40'></div>
                </section>
                <section className='w-full min-h-full backdrop-blur-xl'>
                      {/* <ToastContainer /> */}
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/signin" element={<SignInPage />} />
                          <Route path="/signup" element={<SignUpPage />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                          <Route path="/rules" element={<Rules />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BrowserRouter>
                </section> 
            </>
    }
    </>
    

    
  )
}

export default App
