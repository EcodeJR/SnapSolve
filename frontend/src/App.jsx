import Home from './pages/Home';
import Navigation from './components/Navigation';
function App() {
  return (
    <section className='w-full h-fit relative bg-whiteMain font-mono'>
      <div className='w-[20vw] h-[50vh] bg-yellowMain absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full opacity-40'></div>
      <div className='w-[20vw] h-[50vh] bg-yellowMain absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-full opacity-40'></div>
      <section className='w-full backdrop-blur-xl p-5'>
        <Navigation />
        <Home />
      </section>
      
    </section>
    
  )
}

export default App
