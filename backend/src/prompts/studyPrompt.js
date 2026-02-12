const studyPrompt = ({ exam, subject, topic }) => {
  return `
You are an expert exam coach.

Exam: ${exam}
Subject: ${subject}
Topic: ${topic}

Respond in this EXACT format:

## Concepts
- concept 1
- concept 2

## Likely Questions
1. question 1
2. question 2

## Common Mistakes
- mistake 1
- mistake 2

## Revision Tips
- tip 1
- tip 2

Be concise and exam-focused.
`;
};

module.exports = { studyPrompt };
