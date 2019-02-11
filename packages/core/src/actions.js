module.exports.basicTextReply = basicTextReply = text => ({
  type: text && text !== "" ? "message-reply" : "ignore",
  message: { contentType: "text", content: text }
});

module.exports.randomBasicFromArray = replies =>
  basicTextReply(replies[Math.floor(Math.random() * replies.length)]);
