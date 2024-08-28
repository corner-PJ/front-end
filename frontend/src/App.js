import './App.css';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Router from './Router';
import { ReviewProvider } from './components/ReviewContext'; 
import { ListProvider } from './components/ListContext'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <ReviewProvider>
      <ListProvider>
        <ToastContainer />
        <div className="App">
          <Nav />
          <div className='main'>
            <Router />
          </div>
          <Footer />
        </div>
      </ListProvider>
    </ReviewProvider>
  );
}

export default App;