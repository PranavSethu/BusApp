import React, {useState, useEffect} from 'react';
import BusSearch from './page/BusSearch';
import Signup from './page/Signup';
import Login from './page/Login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import SeatSelection from './page/SeatSelection';
import PaymentPage from './page/PaymentPage';
import BusSeatSelection from './page/BusSeatSelection';
import PassengerDetailsForm from './page/PassengerDetailsDialog';
 
function App() {
 
  return (
             
          <Routes>
              <Route path="/home" element={<BusSearch/>}/>                                                                        
              {/* <Route path="/" element={<Home/>}/> */}
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/" element={<Login/>}/>
              <Route path="/seat-selection" element={<SeatSelection/>} />
              // In your router configuration file
              <Route path="/busseatselection/:tripId" element={<BusSeatSelection />} />
              <Route path='/passengerdetailsform' element={<PassengerDetailsForm/>}/>
              <Route path="/payment-page" element ={<PaymentPage/>}/>
          </Routes>                    
  );
}
 
export default App;
