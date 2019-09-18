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
          botName="OrderFlowers_dev"
          welcomeMessage="Welcome, how can I help you today?"
          onComplete={this.handleComplete.bind(this)}
          clearOnComplete={true}
          conversationModeOn={false}
        />
    );
  }
}

export default MyChatbox;