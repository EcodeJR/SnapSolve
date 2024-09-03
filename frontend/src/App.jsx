import Home from './pages/Home';
import Navigation from './components/Navigation';
function App() {
  return (
    <>
    <section className='w-full h-screen fixed top-0 left-0 bg-whiteMain font-[Montserrat Alternates]'>
      <div className='w-[40vw] h-[30vh] md:w-[30vw] md:h-[30vh] lg:w-[20vw] lg:h-[50vh] bg-yellowMain absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full opacity-40'></div>
      <div className='w-[40vw] h-[30vh] md:w-[30vw] md:h-[30vh] lg:w-[20vw] lg:h-[50vh] bg-yellowMain absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full opacity-40'></div>
    </section>
    <section className='w-full h-fit backdrop-blur-xl p-5'>
        <Navigation />
        <Home />
    </section>
    </>
    

    
  )
}

export default App
