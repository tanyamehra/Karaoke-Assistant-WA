import React, { useState, useEffect } from 'react';
import './Browse.css'
import Dropdown from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const [selectedVocalRange, setSelectedVocalRange] = useState("");
  const navigate = useNavigate();
  const vocal_r = selectedVocalRange;
  
  navigate('/songify', { vocal_r })
  console.log(selectedVocalRange)

  return (
    <div className="browse">
      <p>
      Here, you can browse song recommendations without using the Vocal Range Detector. Choose a vocal range from the dropdown menu below.
      </p>
      <Dropdown selectedVocalRange={selectedVocalRange} setSelectedVocalRange={setSelectedVocalRange} />
      
    </div>
  );
};

export default Browse;
