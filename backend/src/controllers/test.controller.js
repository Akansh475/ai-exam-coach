exports.getTest = async (req, res) => {
  res.json({
    title: "Z-Transform Properties",
    duration: 15,
    questions: [
      {
        id: 1,
        question:
          "Which property of Z-transform converts convolution in time domain to multiplication in Z-domain?",
        options: [
          "Linearity Property",
          "Time-Shifting Property",
          "Convolution Property",
          "Multiplication Property",
        ],
        correct: 2,
      },
      {
        id: 2,
        question:
          "What happens to ROC after time shifting?",
        options: [
          "Remains same",
          "Expands",
          "Shrinks",
          "Shifts",
        ],
        correct: 3,
      },
    ],
  });
};
