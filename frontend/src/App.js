import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className='main'>
          <Routes>
          </Routes>
        </div>
        <Footer />
      </div> 
    </BrowserRouter>
  );
}

export default App;
