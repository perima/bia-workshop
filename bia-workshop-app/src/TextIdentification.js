/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/TextIdentification.js
 * 
 */
import React, { useState } from 'react';
import Amplify, { Storage, Predictions } from 'aws-amplify';
import awsconfig from './aws-exports';

function TextIdentification(props) {

  function identifyFromFile(event) {
     props.parentCallback('please wait, using textract to identify text');
    const { target: { files } } = event;
    const [file,] = files || [];

    if (!file) {
      return;
    }
    Predictions.identify({
      text: {
        source: {
          file,
        },
        format: "ALL", // Available options "PLAIN", "FORM", "TABLE", "ALL"
      }
    }).then(({text: { fullText }}) => {
      props.parentCallback(fullText);
    })
     .catch(err => {
         props.parentCallback(JSON.stringify(err, null, 2));
      });
  }

  return (
    <div className="Text">
        <h3>Text identification</h3>
        <input type="file" onChange={identifyFromFile}></input>
    </div>
  );
}

export default (TextIdentification);