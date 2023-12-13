import React, { useState, useEffect } from 'react';
import microphoneIcon from '../static/microphone.png';
import maleIcon from '../static/male.png'; 
import femaleIcon from '../static/female.png'; 
import './Home.css';
import {analyzeAudio} from '../audioUtils';
import { useNavigate } from 'react-router-dom';
import startPitchDetectionAndReturnResults from '../Pitch';



const Home = () => {
  const RECORD_TIME = 3 // set to 5 seconds by default. More time will require processing time
  const CLOCK_TIME = RECORD_TIME + 2  // additional time for processing
  const [isRecording, setIsRecording] = useState(false);
  const [micClicked, setMicClicked] = useState(false);
  const [timer, setTimer] = useState(CLOCK_TIME); // Initialize the timer to 5 seconds
  const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility
  const [isVeryLow, setIsVeryLow] = useState(false); // State to manage loader visibility
  const [selectedGender, setSelectedGender] = useState('female'); // State for selected gender
  const [results, setResults] = useState(null); // Initialize results as null
  const navigate = useNavigate();
  

  const startPitchDetection = () => {
    processPitchDetection(RECORD_TIME)
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  useEffect(() => {
    let countdownInterval;

    if (micClicked && timer > 0) {
      // Start countdown timer when the microphone is clicked
      countdownInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Update the timer every 1 second
    } else if (micClicked && timer === 0 && isRecording) {
      // Stop recording when the countdown timer reaches 0 seconds
      stopRecording();
    }

    // Clear the interval when the component unmounts
    return () => clearInterval(countdownInterval);
  }, [micClicked, timer, isRecording]);

  const handleMicClick = () => {
    if (!micClicked && timer === CLOCK_TIME && !isRecording) {
      // Start the countdown timer when the microphone is clicked for the first time
      setMicClicked(true);
      setIsVeryLow(false)
      startRecording();
    }
  };

  // Recording start point
  const startRecording = async () => {
    startPitchDetection();
    setIsRecording(true)
  };

  // Recording stop point
  const stopRecording = () => {
      setIsRecording(false);
      setTimer(CLOCK_TIME)
      setMicClicked(false)
      analyzer();
  };

  // Record and process the voice for the said duration
  async function processPitchDetection(RECORD_TIME) {
    try {
      await startPitchDetectionAndReturnResults(RECORD_TIME)
          .then((detectionResults) => {
            // Update the state with the results
            setResults(detectionResults);
          }); 
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Analyse the recorded voice.
  const analyzer = async () => {
    try {
      // Analyze the audio and store the results in state
      const result = await analyzeAudio(results, selectedGender);
      console.log(result)
      const state = {
        ...result,
        "gender": selectedGender
      }
      if(result.pitch == null){
        setIsVeryLow(true)
      }else{
        // Make call to the results page
        navigate('/songify', { selectedGender })
      }
    } catch (error) {
      console.error('Error analyzing audio:', error);
    } finally {
      setIsLoading(false); // Hide the loader when analysis is complete (success or error)
    }

  };

  // Function to format the timer as "00:00" and change color when last 5 seconds
  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Change timer color to red when last 5 seconds
    const timerClassName = seconds <= 5 ? 'countdown-timer red' : 'countdown-timer';

    return (
      <div className={timerClassName}>
        {formattedMinutes}:{formattedSeconds}
      </div>
    );
  };

  return (
    <div className="home">

<div className="gender-selection-card">
      <div className="gender-icon">
        <img src={maleIcon} alt="Male" />
      </div>
      <div className="gender-label">
        <label>
          Male
          <br />
          <input
            type="radio"
            name="gender"
            value="male"
            checked={selectedGender === 'male'}
            onChange={handleGenderChange}
          />
        </label>
      </div>

      <div className="gender-icon">
        <img src={femaleIcon} alt="Female" />
      </div>
      <div className="gender-label">
        <label>
          Female
          <br />
          <input
            type="radio"
            name="gender"
            value="female"
            checked={selectedGender === 'female'}
            onChange={handleGenderChange}
          />
        </label>
      </div>
    </div>

      <a
        href='#'
        className={`microphone ${micClicked ? 'disabled' : ''}`}
        onClick={handleMicClick}
      >
        <img src={microphoneIcon} alt="Microphone Icon" />
      </a>
        <div className="timer" style={{ color: timer <= 5 ? 'red' : 'black' }}>
          {micClicked && formatTimer(timer)}
        </div>
      <p className="text-status" >
        {isRecording ? 'Listening' : isVeryLow ? 'Sing a bit louder' : 'Tap on mic to record your voice'}
        
      </p>
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
