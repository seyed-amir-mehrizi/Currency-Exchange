import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import CurrencyConvertor from './components/CurrencyConvertor';
import ViewConversionHistory from './components/ViewConversionHistory';

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path='/' element={<CurrencyConvertor />} />
        <Route path='/history' element={<ViewConversionHistory />} /> 
      </Routes>
    </div>
  );
}

export default App;
