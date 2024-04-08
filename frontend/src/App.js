
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Router from './Router';

function App() {
  return (
      <div className="App">
        <Nav />
        <div className='main'>
          <Router />
        </div>
        <Footer />
      </div> 

  );
}

export default App;
