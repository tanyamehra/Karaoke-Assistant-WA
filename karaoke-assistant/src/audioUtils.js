export async function analyzeAudio(audioBlob) {
  const audioContext = new AudioContext();

  try {
    // Convert the Blob to an ArrayBuffer
    const arrayBuffer = await audioBlob.arrayBuffer();

    // Decode the ArrayBuffer into audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const pitchResult = calculatePitchFromBuffer(audioBuffer);

    return pitchResult;
  } catch (error) {
    console.error('Error decoding audio data:', error);
    throw error;
  }
}

function calculatePitchFromBuffer(audioBuffer) {
  const buf = audioBuffer.getChannelData(0); // Assuming mono audio

  function autoCorrelate(buf, sampleRate) {
    // Constants
    const SIZE = buf.length / 2;
    const THRESHOLD = 0.2; // Adjust this threshold as needed

    // Calculate RMS (Root Mean Square) of the audio buffer
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    // If the RMS is too low, there's not enough signal
    if (rms < 0.01) {
      return -1;
    }

    // Find the first and last index where the absolute value of the buffer is below the threshold
    let r1 = 0;
    let r2 = SIZE - 1;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buf[i]) < THRESHOLD) {
        r1 = i;
        break;
      }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buf[SIZE - i]) < THRESHOLD) {
        r2 = SIZE - i;
        break;
      }
    }

    // Trim the buffer based on the found indices
    const trimmedBuf = buf.slice(r1, r2);
    const trimmedSize = trimmedBuf.length;

    // Calculate the autocorrelation function
    const c = new Array(trimmedSize).fill(0);
    for (let i = 0; i < trimmedSize; i++) {
      for (let j = 0; j < trimmedSize - i; j++) {
        c[i] += trimmedBuf[j] * trimmedBuf[j + i];
      }
    }

    // Find the index with the maximum autocorrelation value (T0)
    let d = 0;
    while (c[d] > c[d + 1]) {
      d++;
    }
    let maxval = -1;
    let maxpos = -1;
    for (let i = d; i < trimmedSize; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }

    const T0 = maxpos;

    // Calculate the pitch (in Hertz)
    const pitch = sampleRate / T0;

    return pitch;
  }

  // Create an AnalyserNode for pitch detection
  var audioContext = new AudioContext();
  var analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0;
  analyser.minDecibels = -100;
  analyser.maxDecibels = -30;

  var sampleRate = audioContext.sampleRate;
  // Connect the analyser to an audio buffer source
  var source = audioContext.createBufferSource();

  source.buffer = audioBuffer;
  source.connect(analyser);

  // Perform pitch detection
  var bufLength = analyser.fftSize;

  // var buf = new Float32Array(bufLength);

  analyser.getFloatTimeDomainData(buf);
  var pitch = autoCorrelate(buf, sampleRate);


  if (pitch === -1) {
    return {
      pitch: null,
      note: '-',
    };
  } else {
    var note = noteFromPitch(pitch);
    return {
      pitch: Math.round(pitch),
      note: noteStrings[note % 12],
    };
  }  
}


// Function to map a frequency to a note
function noteFromPitch(frequency) {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
}


// Array of note strings
const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
