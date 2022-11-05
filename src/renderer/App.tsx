import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './routes/SignIn';
import Home from './routes/Home';

export default function App() {
  return (
    <HashRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>  
    </div>
    </HashRouter>
  );
}
