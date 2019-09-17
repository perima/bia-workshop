import React, { useState } from 'react';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import Amplify from 'aws-amplify';
import TextField from '@material-ui/core/TextField';

Amplify.addPluggable(new AmazonAIPredictionsProvider());

function LabelsIdentification() {
  const [response, setResponse] = useState("Select a file and click upload for test ");

  function identifyFromFile(event) {
    setResponse(JSON.stringify('please wait', null, 2));
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
      }).then(result => setResponse(JSON.stringify(result, null, 2)))
      .catch(err => setResponse(JSON.stringify(err, null, 2)))
  }

  return (
    <div className="Text">
        <h3>Labels identification</h3>
        <input type="file" onChange={identifyFromFile}></input>
        <br/>
        <TextField
                id="outlined-multiline-flexible"
                label="Textract output"
                multiline
                fullWidth
                rows="30"
                value={response}
                margin="normal"
                variant="outlined"
              />
    </div>
  );
}

export default (LabelsIdentification);
