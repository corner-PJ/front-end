import './App.css';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
        <ToastContainer />
        <div className="App">
          <Nav />
          <div className='main'>
            <Router />
          </div>
          <Footer />
        </div>
    </>
  );
}

export default App;