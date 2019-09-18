

# Building Intelligent Applications workshop.

## 1. About this workshop


# 1. Create Cloud9 Workspace

## 1.2. Create new environment
1. Go to the Cloud9 web console.
2. At the top right corner of the console, make sure you’re using one of these regions: Virginia (us-east-1), Oregon (us-west-2), Ireland (eu-west-1) or Singapore (ap-southeast-1)
3. Select Create environment
4. Name it BIA-workshop, and go to the Next step
5. Select Create a new instance for environment (EC2) and pick t2.medium
6. Leave all of the environment settings as they are, and go to the Next step
7. Click Create environment

## 1.3. Optimize your Cloud9 workspace
1. Switch to dark theme 
2. Close the lower terminal window 
3. Close welcome screen
4. Open new terminal 

@todo add here the screenshot with instructions

## 1.4. Install & update your workspace.
Run the following commands 

```bash
# Update the AWS CLI
pip install --user --upgrade awscli

# Install and use Node.js v8.11 (to match AWS Lambda)
nvm install v8.11.0
nvm alias default v8.11.0

# Install the AWS Amplify CLI
npm install -g @aws-amplify/cli

# Install jq
sudo yum install jq -y
```

## 1.5. Configure default region

Configure default AWS region for Amplify CLI, please note we are using us-west-2 for this workshop.

```bash
cat <<END > ~/.aws/config
[default]
region=us-west-2
END
```

# Bootstrap our React application

Setup our react application

```bash
npx create-react-app bia-workshop-app


```bash
cd bia-workshop-app/
```

## Install Material UI
For our components we will use Material UI. Run the following command and ignore any warnings.

```bash
## install material-ui
npm install --save @material-ui/core

## install required font
npm install typeface-roboto --save
```

## Start your app
```bash
npm start
```

## Open additional terminal 
We want to keep the app preview running so we will open a new terminal to work with.

## Open preview window in new browser tab


## Clean up src/app.js 
Replace the contents of src/app.js file with the following
```javascript
/**
 * 
 * Building Intelligent Applications Workshop
 * 
 */

import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'typeface-roboto';

class App extends Component { 
    render() { 
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
              <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
               Unicorns are real!
              </Typography>
            </Container>
          </React.Fragment>
        );
    }
}

export default App;
```


## Initialize Amplify

1. In the project source directory run the  ```bash amplify init``` command.
 
2. Press Enter to accept the default project name (should be ‘bia-workshop-app’)

3. Enter ‘dev’ for the environment name

4. Select ‘None’ for the default editor (we’re using Cloud9)

5. Choose JavaScript and React when prompted

6. Accept the default values for src/build paths 

7. Accept the default values for  build/start commands

8. Press Enter to accept the default value (Y) to use AWS profile

9. Press Enter to select the default AWS profile 

@todo add here amplify-settings.png

# Add Authentication
We will start by adding authentation to our app.

In the terminal use command ```amplify add auth```

You will be asked a number of questions, please use the following values:

*Do you want to use the default authentication and security configuration?* **Default Configuration**

*How do you want users to be able to sign in?* **Username**

*Do you want to configure advanced settings?* **No, I am done.**

Run ```amplify push``` to publish your backend changes in the cloud.

When asked *Are you sure you want to continue?* Press Enter.

Please note building the backend resources may take a couple of minutes.

# Add Amplify npm dependencies
 ```npm install --save aws-amplify aws-amplify-react ```
 
## Import amplify packages in our app.
Time to replace the contents of src/app.js one more time to 

Import and configure the AWS Amplify JS library

Import the withAuthenticator higher order component from aws-amplify-react

Wrapp the App component using withAuthenticator


```javascript
/**
 * 
 * Building Intelligent Applications Workshop
 * 
 */

import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'typeface-roboto';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(aws_exports); // aws-exports.js file is managed by AWS Amplify

class App extends Component { 
    render() { 
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
              <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
                Unicorns are real!
              </Typography>
            </Container>
          </React.Fragment>
        );
    }
}

export default withAuthenticator(App, {includeGreetings: true});
```

## Create an account in the app
Once you saved the new contents of app.js, your preview tab should refresh and display a login. 
Its time to register (with a valid email address) to use the app. Enter the validation code
received in your inbox to complete the registration and login.

We now have working authentation for our app :-) 

# Amazon Rekognition

## Configure backend for Rekognition
The first AI service we will add to our application is Amazon Rekognition.

In your terminal run the command ```amplify add predictions``` to automatically create the backend configuration.

Please give the following answers to the questions when prompted:

*Please select from one of the categories below* **Identify**

*What would you like to identify?* **Identify Labels**

*Provide a friendly name for your resource* **[Press Enter to accept the default value]**

*Would you like use the default configuration?* **Default Configuration**

*Who should have access?* **Auth users only**

We are now ready to publish our backend by running the command ```amplify push``` and press Enter when asked if you would like to proceed.

## Modify the app.js file to include predictions

We now need to create the predictions components. 

## create the LabelsIdentification component

Create a file called src/LabelsIdentification.js and add the following content


```javascript 

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

```

## update app.js to use the new LabelsIdentification component.
```javascript 
import LabelsIdentification from './LabelsIdentification' //rekognition
```

and

```javascript
 <LabelsIdentification  parentCallback={this.callbackFunction} />
```

Your src.app.js file should look like the below

```javascript

/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src.app.js
 * 
 */

import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import 'typeface-roboto';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import LabelsIdentification from './LabelsIdentification' //rekognition

Amplify.configure(aws_exports); // aws-exports.js file is managed by AWS Amplify


class App extends Component {
  
  state = { response: "please wait" }
  
  
    callbackFunction = (childData) => {
      console.log('parent state');
          this.setState({response: childData});
    }
  
  render() {
    return (
      <React.Fragment>
            <CssBaseline />
            <Container>
              <Typography component="div" >
                Unicorns are real!
                  <LabelsIdentification  parentCallback={this.callbackFunction} />
              </Typography>
               <TextField
                id="outlined-multiline-flexible"
                label="output"
                multiline
                fullWidth
                rows="30"
                value={this.state.response}
                margin="normal"
                variant="outlined"
              />
            </Container>
          </React.Fragment>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });

```

# Amazon Textract

Run the command ```amplify add predictions```

Answer the questions in the following way

*? Please select from one of the categories below* **Identify**

*? What would you like to identify?* **Identify Text**

*? Provide a friendly name for your resource identify* **[Press Enter to select the suggested name]**

*? Would you also like to identify documents?* **Yes**

*? Who should have access?* **Auth users only**

Run the command ```amplify push``` to update our cloud backend and select Yes when asked if you want to continue.

## Create the text identification component 

```javascript

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

```

## Import the new react component into app.js

add to your imports at the top of the filq

```javascript 
import TextIdentification from './TextIdentification'; //textract 
```

add the component in the render function 

```javascript 
<TextIdentification parentCallback={this.callbackFunction} /> 
```

your app.js shoud look like the one below

```javascript

/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src.app.js
 * 
 */

import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import 'typeface-roboto';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import LabelsIdentification from './LabelsIdentification' //rekognition
import TextIdentification from './TextIdentification'; //textract

Amplify.configure(aws_exports); // aws-exports.js file is managed by AWS Amplify


class App extends Component {
  
  state = { response: "please wait" }
  
  
    callbackFunction = (childData) => {
      console.log('parent state');
          this.setState({response: childData});
    }
  
  render() {
    return (
      <React.Fragment>
            <CssBaseline />
            <Container>
              <Typography component="div" >
                Unicorns are real!
                  <LabelsIdentification  parentCallback={this.callbackFunction} />
                  <TextIdentification parentCallback={this.callbackFunction} />
              </Typography>
               <TextField
                id="outlined-multiline-flexible"
                label="output"
                multiline
                fullWidth
                rows="30"
                value={this.state.response}
                margin="normal"
                variant="outlined"
              />
            </Container>
          </React.Fragment>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });


```


# Amazon Transcribe

run ```amplify add predictions```

and select the following answers when prompted


*Please select from one of the categories below* **Convert**

*What would you like to convert?* ** Transcribe text from audio **

*Provide a friendly name for your resource* **[Press Enter to select suggested default name]**

*What is the source language?* **British English** - or select desired supported language from the available list

*Who should have access?* **Auth users only**

run ```amplify push``` to publish your backend changes to the cloud. Select **Y** when asked if you are sure you want to continue.

## Add mic capture to our react application

In your terminal, run the following command ```npm install --save microphone-stream``` to add mic audio capture capability to our application.

## Create component to handle audio capture and transcription ## 

create file ```src/SpeechToText.js```

```javascript 

/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/SpeechToText.js
 * 
 */
import React, { useState } from 'react';

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
         language: "en-GB", // other options are "en-US", "fr-FR", "fr-CA", "es-US"
      },
    }).then(({ transcription: { fullText } }) => {
        console.log('fulltext', fullText);
        setResponse(fullText);
         props.parentCallback(fullText);
    })
      .catch(err => {
          console.log(err);
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

```


# Amazon Comprehend 

Run ```amplify add predictions```

Answer the questions as follows when prompted 

*Please select from one of the categories below* **Interpret**

*What would you like to interpret? Interpret* **Text**

*Provide a friendly name for your resource* **[Press Enter to accept the name suggested]**

*What kind of interpretation would you like?* **All**

*Who should have access?* **Auth users only**

It's now time to publish our backend changes to the cloud. Run ```amplify push``` and select **Y** when prompted.

## Create react component for comprehend 

```javascript

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

```