// Esta funcion convierte nuestro texto en un objeto con nuestra respuesta y otros
// datos utiles
const {
  basicTextReply,
  basicEmbedReply,
  randomBasicFromArray as pickFrom,
} = require('../actions');

import replyStock from './data/replyDb.json';
import * as embed from './data/embedBase.json';

const xToLower = x => String(x).toLowerCase();
const replies = new Map(replyStock); //eslint-disable-line

const replyThis = basicTextReply;

export const checkForStaticReply = content => replies.has(xToLower(content));

export const getStaticReply = content => {
  const reply = replies.get(xToLower(content));
  return reply && Array.isArray(reply) ? pickFrom(reply) : replyThis(reply);
};
