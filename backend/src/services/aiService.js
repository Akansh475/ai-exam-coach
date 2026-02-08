const axios = require("axios");

const OLLAMA_URL = "http://localhost:11434/api/generate";

const generateAI = async (prompt) => {
  const res = await axios.post(OLLAMA_URL, {
    model: "mistral",
    prompt,
    stream: false,
  });

  return res.data.response;
};

module.exports = { generateAI };
