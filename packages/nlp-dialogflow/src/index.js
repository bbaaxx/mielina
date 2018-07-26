// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const marshallResponse = require("./marshallResponse");

// You can find your project ID in your Dialogflow agent settings
const query = 'hello';
const languageCode = 'en-US';

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

module.exports = function(config) {
  const { projectId, sessionId } = config;
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  return (content, sessionId) => sessionClient
    .detectIntent(request)
    .then(marshallResponse)
    .catch(err => {
      console.error('ERROR:', err);
    });
}