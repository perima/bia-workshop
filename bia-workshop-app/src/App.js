/**
 * 
 * Building Intelligent Applications Worksgop
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