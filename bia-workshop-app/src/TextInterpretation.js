/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/TextInterpretation.js
 * 
 */
import React, { useState } from 'react';
import './App.css';
import Amplify, { Storage, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import awsconfig from './aws-exports';

function TextInterpretation(props) {
  const [response, setResponse] = useState("Input some text and click enter to test")
  const [textToInterpret, setTextToInterpret] = useState("write some text here to interpret");

  function interpretFromPredictions() {
    Predictions.interpret({
      text: {
        source: {
          text: textToInterpret,
        },
        type: "ALL"
      }
    }).then(result => {
        setResponse(JSON.stringify(result, null, 2))
        props.parentCallback(JSON.stringify(result, null, 2));
    })
      .catch(err => {
          setResponse(JSON.stringify(err, null, 2))
           props.parentCallback(JSON.stringify(err, null, 2));
      })
  }

  function setText(event) {
    setTextToInterpret(event.target.value);
  }

  return (
    <div className="Text">
        <h3>Text interpretation</h3>
        <input value={textToInterpret} onChange={setText}></input>
        <button onClick={interpretFromPredictions}>test</button>
    </div>
  );
}

export default (TextInterpretation);