import './App.css';
import axios from "axios";
import {useEffect} from "react";
import { Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';

function App() {

  
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </div>
  );
}

export default App;


// Interview Tips : https://docs.google.com/document/d/1-CxSsv-XzYExNHwYBU7FlKklw6_FEMCUPV7XqoaXRos/edit