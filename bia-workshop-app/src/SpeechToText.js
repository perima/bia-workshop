/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/SpeechToText.js
 * 
 */
import React, { useState } from 'react';

import './App.css';
import Amplify, { Storage, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import awsconfig from './aws-exports';

import mic from 'microphone-stream';

Amplify.configure(awsconfig);

function SpeechToText(props) {
  const [response, setResponse] = useState("Press 'start recording' to begin your transcription. Press STOP recording once you finish speaking.");
  
  function AudioRecorder(props) {
    const [recording, setRecording] = useState(false);
    const [micStream, setMicStream] = useState();
    const [audioBuffer] = useState(
      (function() {
        let buffer = [];
        function add(raw) {
          buffer = buffer.concat(...raw);
          return buffer;
        }
        function newBuffer() {
          console.log("reseting buffer");
          buffer = [];
        }
 
        return {
          reset: function() {
            newBuffer();
          },
          addData: function(raw) {
            return add(raw);
          },
          getData: function() {
            return buffer;
          }
        };
      })()
    );

    async function startRecording() {
      console.log('start recording');
      audioBuffer.reset();

      window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
        const startMic = new mic();

        startMic.setStream(stream);
        startMic.on('data', (chunk) => {
          var raw = mic.toRaw(chunk);
          if (raw == null) {
            return;
          }
          audioBuffer.addData(raw);

        });

        setRecording(true);
        setMicStream(startMic);
      });
    }

    async function stopRecording() {
      console.log('stop recording');
      const { finishRecording } = props;

      micStream.stop();
      setMicStream(null);
      setRecording(false);
   
      const resultBuffer = audioBuffer.getData();
         console.log('event', audioBuffer.event);
      if (typeof finishRecording === "function") {
        finishRecording(resultBuffer);
      }

    }

    return (
      <div className="audioRecorder">
        <div>
          {recording && <button onClick={stopRecording}>Stop recording</button>}
          {!recording && <button onClick={startRecording}>Start recording</button>}
        </div>
      </div>
    );
  }

  function convertFromBuffer(bytes) {
      console.log('bytes', bytes);
    setResponse('Converting text...');
     props.parentCallback('Converting text...');
    
    Predictions.convert({
      transcription: {
        source: {
          bytes
        },
       //   "MediaSampleRateHertz": 8000,
         language: "en-US", // other options are "en-US", "fr-FR", "fr-CA", "es-US"
      },
    }).then(({ transcription: { fullText } }) => {
        console.log('fulltext', fullText);
        setResponse(fullText);
         props.parentCallback(fullText);
    })
      .catch(err => {
          console.log('error', err);
          setResponse(JSON.stringify(err, null, 2));
           props.parentCallback(JSON.stringify(err, null, 2));
      });
  }

  return (
    <div className="Text">
        <h3>Speech to text</h3>
        <AudioRecorder finishRecording={convertFromBuffer} />
    </div>
  );
}

export default (SpeechToText);