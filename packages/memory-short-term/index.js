const NodeCache = require("node-cache");

// TODO: Can we avoid this mutable state?
const topics = {};

const getAllTopics = () => topics;

const getTopic = topicId => topics.hasOwnProperty(topicId) && topics[topicId];

const addTopic = (topicId, options = {}) =>
  getTopic(topicId) ||
  Object.assign(topics, { [topicId]: new NodeCache(options) })[topicId];

module.exports = {
  getTopic,
  addTopic
};
