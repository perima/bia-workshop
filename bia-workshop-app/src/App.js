/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/app.js
 * 
 */

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import 'typeface-roboto';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import LabelsIdentification from './LabelsIdentification'; //rekognition
import TextIdentification from './TextIdentification'; //textract
import SpeechToText from './SpeechToText'; // transcribe
import TextInterpretation from './TextInterpretation'; // comprehend
import MyChatbox from './MyChatbox.js'; // lex


class App extends Component {

    state = { response: "please wait" }


    callbackFunction = (childData) => {
        console.log('parent state');
        this.setState({ response: childData });
    }


    render() {

        const classes = makeStyles(theme => ({
            root: {
                width: '100%',
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            },
        }));

        return (
            <div className={classes.root}>
    
      <Grid container direction="row" alignItems="flex-start" spacing={2}>
           
             <Grid item xs={5}>
                <Typography className={classes.heading}></Typography>
                <Typography variant="h4" component="h4" align="center">Building Intelligent Applications Workshop</Typography>
                    <ExpansionPanel>
                    <ExpansionPanelSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>Generate labels for objects in an image</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        <LabelsIdentification  parentCallback={this.callbackFunction} /> 
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>Extract text from images or documents</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                       <TextIdentification parentCallback={this.callbackFunction} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>Transcribe audio</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <SpeechToText parentCallback={this.callbackFunction} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  
                   <ExpansionPanel>
                    <ExpansionPanelSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>Text interpretation</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TextInterpretation parentCallback={this.callbackFunction} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  
                   <ExpansionPanel>
                    <ExpansionPanelSummary
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>Chatbot</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                         <MyChatbox />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  
             </Grid>
             
               <Grid item xs={7}>
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
     
    </div>
        );
    }

}

export default withAuthenticator(App, { includeGreetings: true });
