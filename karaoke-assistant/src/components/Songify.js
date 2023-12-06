import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import { Drawer } from "antd";
import axios from 'axios';
import './Songify.css'; 


const Songify = () => {
  const location = useLocation();
  const receivedProps = location.state;
  const [songResults, setSongResults] = useState([]);
  // const [playerOpen, setPlayerOpen] = useState("")
  // const embedLink = songResults.embed_link;        Sample implementation of additional feature (player)


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
              <th>Song Title</th>
              <th>Artist Name</th>
              <th>Language</th>
              <th>Vocal Range</th>
            </tr>
          </thead>
          <tbody>
            {songResults.map((result, index) => (
              // For functioning player add onClick={() => setPlayerOpen(true)} to tr below
              <tr key={index}>
                <td>{result.title}</td>
                <td>{result.artist_name}</td>
                <td>{result.language}</td>
                <td>{result.vocal_range}</td>
              </tr>
            ))
            }
            {/* Sample iframe from spotify. Player embedded in drawer component */}
            {/* <Drawer title="Player" placement="right" onClose={() => setPlayerOpen(false)} open={playerOpen} size="default">
              <iframe title="player_embed" src="https://open.spotify.com/embed/track/4llK75pXNWZz6KAho2Gp16?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> 
            </Drawer> */}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

export default Songify;