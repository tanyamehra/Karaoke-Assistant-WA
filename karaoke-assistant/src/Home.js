import React, { useState, useEffect } from 'react';
import microphoneIcon from './static/microphone.png';
import './Home.css';
import {analyzeAudio} from './audioUtils';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const RECORD_TIME = 3 // set to 3 seconds by default. More time will require processing time
  const [isRecording, setIsRecording] = useState(false);
  const [micClicked, setMicClicked] = useState(false);
  const [timer, setTimer] = useState(RECORD_TIME); // Initialize the timer to 5 seconds
  const [audioContext, setAudioContext] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility
  const [isVeryLow, setIsVeryLow] = useState(false); // State to manage loader visibility
  let audioChunks = [];
  const navigate = useNavigate();


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
    if (!micClicked && timer === RECORD_TIME && !isRecording) {
      // Start the countdown timer when the microphone is clicked for the first time
      setMicClicked(true);
      setIsVeryLow(false)
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newAudioContext = new AudioContext();
      setAudioContext(newAudioContext);

      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data)
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Play the recorded audio (you can remove this if not needed)
        const audioElement = new Audio(audioUrl);
        audioElement.play();

        // Analyze audio here (call your analyzeAudio function)
        analyzer(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true); // Ideally set start recording here
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop()); // Stop the microphone stream
      setIsRecording(false);
      audioChunks = [];
      if (audioContext) {
        setAudioContext(null);
      }
      audioContext.close();
      setTimer(RECORD_TIME)
      setMicClicked(false)
    }
  };

  const analyzer = async (audioBlob) => {
    // Implement your audio analysis logic here
    setIsLoading(true);    
    try {
      // Analyze the audio and store the results in state
      const result = await analyzeAudio(audioBlob);
      if(result.pitch == null){
        setIsVeryLow(true)
      }else{
        // Make call to the results page
        navigate('/songify', { state: result })
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
