import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Findacat from './components/Findacat.jsx';
import Breeds from './components/Breeds.jsx';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
          <Navbar/>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/findacat' element={<Findacat/>}/>
              <Route path='/breeds' element={<Breeds/>}/>
              <Route path='/contact' element={<Contact/>}/>
            </Routes>
          </BrowserRouter>
          <Footer/>
    </div>
  );
}

export default App;
