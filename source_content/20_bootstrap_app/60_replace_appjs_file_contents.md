## 2.6 Clean up src/App.js 

2.6.1. Using the navigation on the left of your Cloud9 IDE, expand the file tree and open the file ```bia-workshop/bia-workshop-app/src/App.js```

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/2.6.1.png "open additional terminal")

2.6.2. Replace the contents of src/App.js file with the below code. Its our entry point for our single page application and contains placeholders for the various components we will be building through out this workshop. 

```javascript

/**
 * 
 * Building Intelligent Applications Workshop
 * 
 * src/App.js
 * 
 */

import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  spacing: 5,
});

export default function App() {
  
  const [response, setResponse] = useState("output will be displayed here");
   
  return (
    <ThemeProvider theme={theme}>
        <Box
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
        >
                <Grid container direction="row" alignItems="flex-start">

                    <Grid item xs={5}>
                    <Box p={{ xs: 2, sm: 3, md: 4 }} align="center">
                        <Typography variant="h5" align="center">Building Intelligent Applications Workshop</Typography>
                    </Box>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                             expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header">
                                <Typography >Generate labels for objects in an image</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                 <Typography> 
                                    Add Label Identification component here...
                                  </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel>
                            <ExpansionPanelSummary
                             expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header">
                                <Typography>Extract text from images or documents</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                 <Typography> 
                                    Add text extraction component here...
                                     </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel>
                            <ExpansionPanelSummary
                             expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header">
                                <Typography>Transcribe audio</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                             <Typography> 
                                Add audio transcribe component here...
                                 </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel>
                            <ExpansionPanelSummary
                             expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header">
                                <Typography >Text interpretation</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                             <Typography> 
                                Add text interpretation component here...
                                 </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel>
                            <ExpansionPanelSummary
                             expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header">
                                <Typography>Chatbot</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                             <Typography> 
                                Add chatbot component here
                                 </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Box p={{ xs: 10, sm: 10, md: 10 }} align="center">
                            <img src={ "https://raw.githubusercontent.com/perima/bia-workshop/master/images/AWS-logo.png" } />
                        </Box>
                    </Grid>

                    <Grid item xs={7}>
                      <Box  p={{ xs: 2, sm: 3, md: 4 }}>
                        <TextField
                           id="outlined-multiline-flexible"
                           label="output"
                           multiline
                           fullWidth
                           rows="30"
                           value={response}
                           margin="normal"
                           variant="outlined"/>
                           </Box>
                    </Grid>
                </Grid>
         
        </Box>
      </ThemeProvider>
  );
}


```

2.6.3. Save the file (command + S for mac, ctrl + s for windows or File Save using the Cloud9 navigation).

2.6.4. Check your app preview browser tab, you should be seeing the app with the placeholders (click to expand each section). 

![alt text](https://raw.githubusercontent.com/perima/bia-workshop/master/images/2.6.4.png "view revised App.js")