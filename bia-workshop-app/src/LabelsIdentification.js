/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/LabelsIdentification.js
 * 
 */
import React, { useState } from 'react';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import Amplify from 'aws-amplify';

Amplify.addPluggable(new AmazonAIPredictionsProvider());

function LabelsIdentification(props) {
  
  function identifyFromFile(event) {
    props.parentCallback('please wait, calling rekognition');
    const { target: { files } } = event;
    const [file, ] = files || [];

    if (!file) {
      return;
    }
    Predictions.identify({
        labels: {
          source: {
            file,
          },
          type: "ALL" // "LABELS" will detect objects , "UNSAFE" will detect if content is not safe, "ALL" will do both default on aws-exports.js
        }
    }).then(result => {
      props.parentCallback(JSON.stringify(result, null, 2));
    })
      .catch(err => {
         props.parentCallback(JSON.stringify(err, null, 2));
      });
  }

  return (
    <div className="Text">
        <h3>Labels identification</h3>
        <input type="file" onChange={identifyFromFile}></input>
    </div>
  );
}

export default (LabelsIdentification);
