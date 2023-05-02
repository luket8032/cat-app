import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import News from './components/News.jsx';
import Games from './components/Games.jsx';
import About from './components/About';

function App() {
  return (
    <div className="App">
          <Navbar/>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/news' element={<News/>}/>
              <Route path='/games' element={<Games/>}/>
              <Route path='/about' element={<About/>}/>
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
