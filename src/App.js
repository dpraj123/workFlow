import React, { useState } from 'react';
import Calendar from './Calender.tsx';
import "./App.css"

const App = () => {
  const [showFromCalender, setShowFromCalender] = useState(false)
  const [showToCalender, setShowToCalender] = useState(false)
  return (
    <div>
      <button className='one-way-button' onClick={() => setShowFromCalender(prev => !prev)}> From</button>
      <button className='one-way-button' onClick={() => setShowToCalender(prev => !prev)}> To</button>
      {showFromCalender && <Calendar />}
      {showToCalender && <Calendar showOneWayButton={true} />}
    </div>
  );
};

export default App;
