import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Songify.css'; 


const Songify = () => {
  const location = useLocation();
  const receivedProps = location.state;
  const [songResults, setSongResults] = useState([]);


  useEffect(() => {
    // Make a GET request to backend API
    axios.get('http://localhost:3001/api/songs', {
      params: {
        vocal_name: receivedProps.vocalRangeWithGender === "Unknown" ? receivedProps.vocalRange : receivedProps.vocalRangeWithGender, 
      },
    })
    .then((response) => {
      setSongResults(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  // Can now use pitch and note data in component
  return (
    <div>
      <div className="songify-container">
      <h1 className="heading">Find your recommended songs</h1>

      {songResults.length === 0 ? (
        <p>No matching songs found.</p>
      ) : (
        <table className="song-table">
          <thead>
            <tr>
              <th>Artist Name</th>
              <th>Language</th>
              <th>Song Title</th>
              <th>Vocal Range</th>
            </tr>
          </thead>
          <tbody>
            {songResults.map((result, index) => (
              <tr key={index}>
                <td>{result.artist_name}</td>
                <td>{result.language}</td>
                <td>{result.title}</td>
                <td>{result.vocal_range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

export default Songify;