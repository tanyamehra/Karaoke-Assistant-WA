export async function analyzeAudio(audioData, gender) {

    const pitchResult = analysePitchForResults(audioData,gender);
    return pitchResult;

}
  
  // Find pitch, note and vocal ranges from the given audio data and gender information
  function analysePitchForResults(audioData,gender) {
    // For very low audio data
    if (audioData.pitch < 50) {
      return {
        pitch: null,
        note: '-',
      };
    } else {
      var note = noteFromPitch(audioData.pitch);
      return {
        pitch: audioData.pitch,
        note: noteStrings[note % 12],
        vocalRange: getVocalRange(audioData,gender),
        clarity: audioData.clarity
      };
    }  
  }
  
  
  // Function to map a frequency to a note
  function noteFromPitch(frequency) {
      const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
      return Math.round(noteNum) + 69;
  }

  // Define vocal ranges for male and female singers
const vocalRanges = {
    male: [
      {
        type: 'Tenor',
        range: { min: 123.47, max: 329.00 },
      },
      {
        type: 'Bass',
        range: { min: 82.41, max: 261.63 },
      },
      {
        type: 'Baritone',
        range: { min: 98.00, max: 329.63 },
      },
      // {
      //   type: 'Alto',
      //   range: { min: 174.61, max: 523.25 },
      // },
      // {
      //   type: 'Mezzo-Soprano',
      //   range: { min: 261.63, max: 1046.50 },
      // },
      // {
      //   type: 'Soprano',
      //   range: { min: 261.63, max: 1046.50 },
      // },
      {
        type: 'Not in range',
        range: { min: 0, max: 0 },
      }
    ],
    female: [
      {
        type: 'Alto',
        range: { min: 174.61, max: 587.33 },
      },
      {
        type: 'Mezzo-Soprano',
        range: { min: 220.00, max: 698.46 },
      },
      {
        type: 'Soprano',
        range: { min: 261.63, max: 880.00 },
      },
      {
        type: 'Not in range',
        range: { min: 0, max: 0 },
      },
    ],
  };
  
  // Function to get vocal range based on pitch and gender
  function getVocalRange(audioData, gender) {
    if (vocalRanges.hasOwnProperty(gender)) {
      const ranges = vocalRanges[gender];
      for (const range of ranges) {
        if (audioData.pitch >= range.range.min && audioData.pitch <= range.range.max) {
          return range.type;
        }
      }
      return 'Not in range';
    } else {
      return 'Unknown gender';
    }
  }
  
  
  // Array of note strings
  const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  
  
  