import React, { useState } from 'react';
import './Browse.css'
import Dropdown from './Dropdown';

const Browse = () => {
  const [selectedVocalRange, setSelectedVocalRange] = useState("");

  return (
    <div className="browse">
      <p>
      This section is for browsing songs without using the Vocal Range Detection.
      </p>
      <Dropdown selectedVocalRange={selectedVocalRange} setSelectedVocalRange={setSelectedVocalRange} />

      {/* <p>You have chosen {selectedVocalRange}!</p> */}
    </div>
  );
};

export default Browse;
