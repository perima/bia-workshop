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

import LabelsIdentification from './LabelsIdentification'
import TextIdentification from './TextIdentification';

Amplify.configure(aws_exports); // aws-exports.js file is managed by AWS Amplify


class App extends Component { 
    render() { 
        return (
            <React.Fragment>
            <CssBaseline />
            <Container>
              <Typography component="div" >
                Unicorns are real!
                  <LabelsIdentification />
                  <TextIdentification />
              </Typography>
            </Container>
          </React.Fragment>
        );
    }
}

export default withAuthenticator(App, {includeGreetings: true});