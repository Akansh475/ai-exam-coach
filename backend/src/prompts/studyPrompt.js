const studyPrompt = ({ exam, subject, topic }) => {
  return `
You are an expert exam coach.

Exam: ${exam}
Subject: ${subject}
Topic: ${topic}

Give:

1. Key concepts
2. 5 exam questions
3. Common mistakes
4. Revision tips

Short. Practical. Exam-focused.
`;
};

module.exports = { studyPrompt };
