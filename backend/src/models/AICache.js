const mongoose = require("mongoose");

const aiCacheSchema = new mongoose.Schema({
  exam: String,
  subject: String,
  topic: String,
  response: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AICache", aiCacheSchema);
