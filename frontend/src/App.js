import './App.css';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Router from './Router';
import { ReviewProvider } from './components/ReviewContext'; 
import { ListProvider } from './components/ListContext'; 
import { useState, useEffect } from 'react';
import Loading from './components/Loading/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 3000; 
    const intervalDuration = 50; 
    const totalIntervals = totalDuration / intervalDuration;

    let intervalCount = 0;

    const timer = setInterval(() => {
      intervalCount += 1;
      setProgress((intervalCount / totalIntervals) * 100);

      if (intervalCount >= totalIntervals) {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, intervalDuration);

    return () => clearInterval(timer);
  }, []);

  return (
  <>{ isLoading? <Loading text="로딩중 · · ·" progress={progress} /> :
    <ReviewProvider>
      <ListProvider>
        <div className="App">
          <Nav />
          <div className='main'>
            <Router />
          </div>
          <Footer />
        </div>
      </ListProvider>
    </ReviewProvider>
  }</>
  );
}

export default App;