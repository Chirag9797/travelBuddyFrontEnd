import React, { useCallback, useRef, useState } from 'react';
import {BrowserRouter as Router, Switch ,useLocation ,Route, Routes} from 'react-router-dom';
import {Container,Row} from 'reactstrap'
import Navbar from './component/Navbar';
import Login from './component/pages/Login';
import Map from './component/pages/Map';
import Post from './component/pages/Post';
import Trips from './component/pages/Trips';
import TravelState from './context/TravelState';
import PrivateRoutes from './PrivateRoute';



const App=()=>{
  return(
    <TravelState>

      <Router>
        <Navbar/>
        <Container>
          <Routes>  
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Post/>} />
            <Route exact path="/map" element={<Map/>} />
            <Route exact path="/trips" element={<Trips/>}/>
          </Routes>
        </Container>
      </Router>
    </TravelState>
  )
}

export default App;