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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';


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
    this.setState({ response: childData });
  }

  render() {

    const classes = makeStyles(theme => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }));

    return (
      <React.Fragment>
            <CssBaseline />
       <Grid container direction="row" alignItems="flex-start">
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item xs={3}>
                  <Container maxWidth="sm">
                    <LabelsIdentification  parentCallback={this.callbackFunction} /> 
                </Container>
              </Grid>
              <Grid item xs={3}>
                <Container maxWidth="sm">
                  <TextIdentification parentCallback={this.callbackFunction} />
                </Container>
              </Grid>
              <Grid item xs={3}>
                <Container maxWidth="sm">    
                  <SpeechToText parentCallback={this.callbackFunction} />
                 </Container> 
              </Grid>
              <Grid item xs={3}>
                  <Container maxWidth="sm">    
                    <TextInterpretation parentCallback={this.callbackFunction} />
                   </Container>
              </Grid>
              <Grid item xs={3}>
                  <MyChatbox />
              </Grid>
            </Grid>
        </Grid>
            
             <Grid item xs={8}>
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
              </Grid>
       </Grid>
            
            
      
      
      
            <Container>
              <Typography component="div" >
                Unicorns are real!
                
              </Typography>
               
            </Container>
            
          </React.Fragment>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
