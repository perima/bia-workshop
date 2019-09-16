
import React, { useState } from 'react';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import Amplify from 'aws-amplify';
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function LabelsIdentification() {
  const [response, setResponse] = useState("Click upload for test ");

  function identifyFromFile(event) {
    const { target: { files } } = event;
    const [file,] = files || [];

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
    }).then(result => setResponse(JSON.stringify(result, null, 2)))
      .catch(err => setResponse(JSON.stringify(err, null, 2)))
  }

  return (
    <div className="Text">
      <div>
        <h3>Labels identification</h3>
        <input type="file" onChange={identifyFromFile}></input>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default (LabelsIdentification);