const apiai = require("apiai");
const marshallResponse = require("./marshallResponse");

/**
 * Configures an agent and returns a provider middleware
 * @param { token: String } config 
 */
module.exports = function(config) {
  const { token } = config;
  const agent = apiai(token);
  return (content, options) =>
    new Promise((resolve, reject) => {
      const request = agent.textRequest(content, { ...options });
      request.on("response", resolve);
      request.on("error", reject);
      request.end();
    })
      .then(marshallResponse)
      .catch(err => {
        console.error("ERROR:", err);
      });
};
