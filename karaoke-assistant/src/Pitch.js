import React, { useState, useEffect } from 'react';
const { PitchDetector } = await import("pitchy");

// Detected Pitch From Audio Sound 
export default async function startPitchDetectionAndReturnResults(RUNNING_TIME) {
  return new Promise(async (resolve, reject) => {
    const audioContext = new window.AudioContext();
    const analyserNode = audioContext.createAnalyser();

    const pitchValues = [];
    const clarityValues = [];
    let averagePitch = 0;
    let averageClarity = 0;
    let clarity = 0;
    const startTime = performance.now(); // Record the start time

    // CONTROL THE BOUNDARIES
    const LOWER_PITCH_BOUND = 1050;
    const UPPER_PITCH_BOUND = 4000;
    const LOWER_SONG_FREQUENCY = 120;
    const UPPER_SONG_FREQUENCY = 1040;

    // Run on every other second to find the pitch values 
    const updatePitch = (analyserNode, detector, input, sampleRate) => {
      analyserNode.getFloatTimeDomainData(input);
      const [detectedPitch, detectedClarity] = detector.findPitch(input, sampleRate);

      clarity = Math.round(detectedClarity * 100);
      if(clarity >= 90) {
        pitchValues.push(detectedPitch);
        clarityValues.push(clarity)
      }
      
      const currentTime = performance.now(); // Get the current time
      const elapsedTime = (currentTime - startTime) / 1000; // Calculate elapsed time in seconds

      if (elapsedTime >= RUNNING_TIME) {
        audioContext.close();
        averagePitch = calculateAverage(pitchValues);
        averageClarity = calculateAverage(clarityValues)
        let minMaxPitch = findMinAndMax(pitchValues)
        let medianPitch = calculateMedian(pitchValues)
        let updatedPitchValue = mapToRange(averagePitch,LOWER_PITCH_BOUND,UPPER_PITCH_BOUND,LOWER_SONG_FREQUENCY,UPPER_SONG_FREQUENCY);
        averagePitch = averagePitch > UPPER_SONG_FREQUENCY ? updatedPitchValue:averagePitch;
        resolve({ pitch: averagePitch, clarity: averageClarity, minPitch: minMaxPitch.min, maxPitch: minMaxPitch.max, median: medianPitch, newPitch: updatedPitchValue});
        
      } else {
        setTimeout(() => {
          updatePitch(analyserNode, detector, input, sampleRate);
        }, 100);
      }
    };

    // Initiate the pitch detection on the audio stream
    const startPitchDetection = async () => {
      pitchValues.length = 0; // Reset pitch values

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext.createMediaStreamSource(stream).connect(analyserNode);

        const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
        const input = new Float32Array(detector.inputLength);
        updatePitch(analyserNode, detector, input, audioContext.sampleRate);
      } catch (error) {
        reject(error);
      }
    };

    // Find out the min and max values from the given list
    function findMinAndMax(arr) {
      if (arr.length === 0) {
        return { min: undefined, max: undefined };
      }
    
      let min = arr[0];
      let max = arr[0];
    
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
          min = arr[i];
        }
        if (arr[i] > max) {
          max = arr[i];
        }
      }
    
      return { min, max };
    }

    // It supress or reduces the very high pitch values into realistic frequency ranges
    function mapToRange(value, minValue, maxValue, targetMin, targetMax) {
      // Ensure the value is within the original range
      value = Math.max(minValue, Math.min(maxValue, value));
    
      // Calculate the linear transformation
      const percent = (value - minValue) / (maxValue - minValue);
      const targetValue = targetMin + percent * (targetMax - targetMin);
    
      return targetValue;
    }

    // Figures out the median value for the given list
    function calculateMedian(pitchArray) {
      // Step 1: Sort the array in ascending order
      const sortedArray = pitchArray.slice().sort((a, b) => a - b);
    
      const length = sortedArray.length;
      
      // Step 2: Check if the number of values is even or odd
      if (length % 2 === 0) {
        // Step 3: Calculate the median for even length
        const middle1 = sortedArray[length / 2 - 1];
        const middle2 = sortedArray[length / 2];
        return (middle1 + middle2) / 2;
      } else {
        // Step 4: Calculate the median for odd length
        return sortedArray[Math.floor(length / 2)];
      }
    }

    // Find average of the given list
    const calculateAverage = (values) => {
        if (values.length === 0) return 0;
        const sum = values.reduce((acc, value) => acc + value, 0);
        return Math.round((sum / values.length) * 10) / 10;
      };

    startPitchDetection();
  });
}