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
