// Esta funcion convierte nuestro texto en un objeto con nuestra respuesta y otros
// datos utiles
const { basicTextReply, randomBasicFromArray } = require("./actions");

const replyStock = require("./data/replyDb.json");
const embed = require("./data/embedBase.json");

const xToLower = x => String(x).toLowerCase();
const replies = new Map(replyStock); //eslint-disable-line

module.exports.checkForStaticReply = content => replies.has(xToLower(content));

module.exports.getStaticReply = content => {
  const availableReplies = replies.get(xToLower(content));
  return availableReplies && Array.isArray(availableReplies)
    ? randomBasicFromArray(availableReplies)
    : basicTextReply(availableReplies);
};
