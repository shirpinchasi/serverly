import { useEffect, useState, useMemo } from 'react';
import PostServers from './components/postServers';
import getServers from "./components/getServer";
import AppBar from "./components/AppBar"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';



function App() {


  return (

    <div className="App">

      <AppBar/>
    </div>

  );
}

export default App;
