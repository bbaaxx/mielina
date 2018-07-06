// Esta funcion convierte nuestro texto en un objeto con nuestra respuesta y otros
// datos utiles
const {
  basicTextReply,
  basicEmbedReply,
  randomBasicFromArray,
} = require('../actions');

const replyStock = require('./data/replyDb.json');
const embed = require('./data/embedBase.json');

const xToLower = x => String(x).toLowerCase();
const replies = new Map(replyStock); //eslint-disable-line

const replyThis = basicTextReply;

module.exports.checkForStaticReply = content => replies.has(xToLower(content));

module.exports.getStaticReply = content => {
  const reply = replies.get(xToLower(content));
  return reply && Array.isArray(reply) ? randomBasicFromArray(reply) : replyThis(reply);
};
