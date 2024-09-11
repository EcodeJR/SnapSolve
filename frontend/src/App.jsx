import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
// import { AuthProvider } from './components/AuthContext';
function App() {
  return (
    <>
    <section className='w-full h-screen fixed top-0 left-0 bg-whiteMain font-[Montserrat Alternates]'>
      <div className='w-[40vw] h-[30vh] md:w-[30vw] md:h-[30vh] lg:w-[20vw] lg:h-[50vh] bg-yellowMain absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full opacity-40'></div>
      <div className='w-[40vw] h-[30vh] md:w-[30vw] md:h-[30vh] lg:w-[20vw] lg:h-[50vh] bg-yellowMain absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full opacity-40'></div>
    </section>
    <section className='w-full min-h-full backdrop-blur-xl'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
    </section>
    </>
    

    
  )
}

export default App
