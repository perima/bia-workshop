

# Building Intelligent Applications workshop.


## About this workshop
This workshop will guide you through creating a single page application leveraging a number of AWS AI services. 

We will write our single page application in [React](https://reactjs.org/) and combine it with [AWS Amplify](https://aws-amplify.github.io) to create and connect to the serverless backend. Finally, we will use [AWS Cloud9](https://aws.amazon.com/cloud9/) for our IDE.

We recommend following the steps in this workshop in the order they are presented.

## Goals
- Build a single page application using React and AWS Amplify.
- Add & use AWS AI services in the application leveraging a serverless backend.

## Contents

1. Setup development environment
2. Bootstrap your React application


# 1. Setup development environment

## 1.1 Create new environment
1.1.1 Go to the [Cloud9 web console](https://us-west-2.console.aws.amazon.com/cloud9/home/product).

1.1.2. At the top right corner of the console, make sure you’re using one of these regions: Virginia (us-east-1), Oregon (us-west-2), Ireland (eu-west-1) or Singapore (ap-southeast-1).

1.1.3. Press **Create environment**

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/1.1.3..png "select correct region!")

1.1.4. Name the environment **BIA-workshop**, and press **Next step**

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/1.1.4.png "enter the environment name!") 

1.1.5. Select pick **t2.medium** for instance type, then press **Next step**

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/1.1.5.png "select tthe instance type") 

1.1.6. In the **Review screen** Press **Create environment**.

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/1.1.7.png "select tthe instance type") 

## 1.2 Optimize your Cloud9 workspace

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/cloud9-tidy-1024.png "Tidy up cloud9 workspace")

1.2.1. Switch **Main Theme** to **AWS Cloud9 Classic Dark Theme**

1.2.2. Switch **Editor Theme** to **Cloud9 Night Low-Color**

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/1.2.1.png "Tidy up cloud9 workspace")

1.2.3 Close the lower terminal window 

1.2.4 Close welcome screen

1.2.5 Open new terminal 

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/1.2.5.png "Tidy up cloud9 workspace")

1.2.6 if your environment is looking like the screenshot below you are ready to proceed. 

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/1.2.6.png "Tidy up cloud9 workspace")

## 1.3 Install packages & update your environment.
Run the following commands in your cloud9 terminal.

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

## 1.4. Configure default region

Configure default AWS region for Amplify CLI, please note we are using us-west-2 for this workshop. In your terminal run the following command 

```bash
cat <<END > ~/.aws/config
[default]
region=us-west-2
END
```

# 2. Bootstrap a new React application

## 2.1. Create a new react application

2.1.1. Run the following command sto bootstram your app 

```bash
npx create-react-app bia-workshop-app
```
2.1.2. Switch to the newly created app directory 

```bash
cd bia-workshop-app/
```

## 2.2. Install Material UI
For our components we will use [Material UI](https://material-ui.com/) (a popular React UI framework). In your terminal, run the following commands and ignore any warnings.

```bash
## install material-ui
npm install --save @material-ui/core

## install required font
npm install typeface-roboto --save
```

## 2.3. Start your app
Run the following command to start your local (cloud9) application so we can preview without deploying the single page app. A few seconds later it will be ready (it should not exit, we want to keep this running in the background).

```bash
npm start
```

## 2.4. Start app preview
2.4.1. Press Preview in the top horizontal bar  
![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/2.4.1.png "open additional terminal")

2.4.2.Open preview window in a new tab  and close the window within the IDE.

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/2.4.2.png "open preview")

2.4.3. Hopefully you got a new tab in your browser open which has loaded your single page application

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/2.4.3.png "open preview")

## 2.5. Open additional terminal 

We want to keep the app preview running so that we can test our app. We will open one more terminal to use with Amplify CLI going forward.

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/2.5.png "open additional terminal")

## 2.6 Clean up src/app.js 
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

![tidy up](https://raw.githubusercontent.com/perima/bia-workshop/master/images/amplify-settings.png "Tidy up cloud9 workspace")

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

Your src/app.js file should look like the below

```javascript

/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/app.js
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

## Create the text identification react component 

Create a new empty file  **src/TextIdentification.js** and paste the source code below.

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

Add the new component in your imports at the top of the src/app.js file

```javascript 
import TextIdentification from './TextIdentification'; //textract 
```

You also need to add the component in the render function 

```javascript 
<TextIdentification parentCallback={this.callbackFunction} /> 
```

Your src/app.js shoud look like the one below

```javascript

/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/app.js
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

Create a src/TextInterpretation.js file and copy and paste the contents below.

```javascript

/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/TextInterpretation.js
 * 
 */
import React, { useState } from 'react';
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

## Add the component to src/app.js
Add the following line at the top of src/app.js 

```javascript 
import TextInterpretation from './TextInterpretation'; // comprehend
```

Now add the component in the render method

```javascript
 <TextInterpretation parentCallback={this.callbackFunction} />
 
```

Your src.app.js should look like the one below

```javascript
/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/app.js
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

import LabelsIdentification from './LabelsIdentification'; //rekognition
import TextIdentification from './TextIdentification'; //textract
import SpeechToText from './SpeechToText'; // transcribe
import TextInterpretation from './TextInterpretation'; // comprehend

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
                  <SpeechToText parentCallback={this.callbackFunction} />
                  <TextInterpretation parentCallback={this.callbackFunction} />
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



# Amazon Lex

It's time to add a chatbot to our app. 

Start by running the command ```amplify add interactions``` in the terminal.

Answer the questions as per below when prompted 

*Provide a friendly resource name that will be used to label this category in the project:* **[Press Enter to accept the suggested name]**

*Would you like to start with a sample chatbot, import a chatbot, or start from scratch?* **Start with a sample**

*Choose a sample chatbot:* **OrderFlowers**

*Please indicate if your use of this bot is subject to the Children's Online Privacy Protection Act (COPPA).*
*Learn more: https://www.ftc.gov/tips-advice/business-center/guidance/complying-coppa-frequently-asked-questions* **No**

Run the command ```amplify push``` to publish your changes to the cloud backend. Answer **Y** when asked if you are sure you want to do so.


## Add the react component for our chatbot 

You will need to go to the Lex console https://us-west-2.console.aws.amazon.com/lex/home to get the name of your newly created
flower chatbot. 

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/chatbot-console.png "Tidy up cloud9 workspace")

## create the react component for our chatbot 

Create a new file src/MyChatbox.js and copy and paste the contents below.

```javascript
/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/MyChatbox.js
 * 
 */
import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};

class MyChatbox extends Component {

  handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed')
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Trip booked. Thank you! what would you like to do next?';
  }

  render() {
    return (
        <ChatBot
          title="My workshop demo chatbot"
          theme={myTheme}
          botName="replace_this_with_your_own_bot_name_from_console"
          welcomeMessage="Welcome, how can I help you today?"
          onComplete={this.handleComplete.bind(this)}
          clearOnComplete={true}
          conversationModeOn={false}
        />
    );
  }
}

export default MyChatbox;
```

## Add the chatbot component to your src/app.js 

You need to import the newly created component by adding the line below to src/app.js at the top. 

```javascript
import MyChatbox from './MyChatbox.js'; // lex
```

Now add the component in your render method of src/app.js file.

```javascript 
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
```

Your src/app.js file should like the one below

```javascript 
/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/app.js
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

import LabelsIdentification from './LabelsIdentification'; //rekognition
import TextIdentification from './TextIdentification'; //textract
import SpeechToText from './SpeechToText'; // transcribe
import TextInterpretation from './TextInterpretation'; // comprehend
import MyChatbox from './MyChatbox.js'; // lex

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
                  <SpeechToText parentCallback={this.callbackFunction} />
                  <TextInterpretation parentCallback={this.callbackFunction} />
                  <MyChatbox />
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


