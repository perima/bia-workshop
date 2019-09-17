
import React, { useState } from 'react';

import Amplify, { Storage, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import TextField from '@material-ui/core/TextField';


import awsconfig from './aws-exports';

function TextIdentification() {
  const [response, setResponse] = useState("You can add a photo by uploading direcly from the app. For this workshop please use jpg/png which support syncronous processing. ")

  function identifyFromFile(event) {
    setResponse('identifiying text...');
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
      setResponse(fullText)
    })
      .catch(err => setResponse(JSON.stringify(err, null, 2)))
  }

  return (
    <div className="Text">
      <div>
        <h3>Text identification</h3>
        <input type="file" onChange={identifyFromFile}></input>
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
    </div>
  );
}

export default (TextIdentification);