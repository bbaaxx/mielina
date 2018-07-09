module.exports.basicTextReply = text => ({
  type: text && text !== "" ? "message-reply" : "ignore",
  message: { contentType: "text", content: text }
});

module.exports.basicEmbedReply = embed => ({
  type: embed ? "message-reply" : "ignore",
  message: { contentType: "embed", content: embed }
});

module.exports.basicRichContentReply = content => ({
  type: content ? "message-reply" : "ignore",
  message: { contentType: "rich-content", content }
});

module.exports.randomBasicFromArray = replies =>
  module.exports.basicTextReply(
    replies[Math.floor(Math.random() * replies.length)]
  );
