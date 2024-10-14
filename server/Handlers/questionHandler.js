const model = require("../MongoDB_Schemas/questionSchema");

exports.addQuestionController = async (req, res) => {
  try {
    const { questions, topicName, topicId, username } = req.body;

    // Check if topicId is not provided in the request body
    if (!topicId) {
      return res
        .status(400)
        .json({ message: "topicId is required in questions." });
    }

    // Corrected the variable name and the query
    const checkAlreadyQuestionPaperExists = await model.findOne({
      topicId: topicId,
    });

    if (checkAlreadyQuestionPaperExists) {
      return res.json({
        message:
          "Please Delete the existing Question paper and add a new paper",
      });
    }

    // Create a new Quiz document
    const quiz = new model({
      questions: questions.map((question) => ({
        id: question.id,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
      })),
      topicName: topicName,
      topicId: topicId,
      username: username,
    });

    // Save the new Quiz document
    await quiz.save();

    res.json({ message: "Question added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add quiz. Please try again later.",
    });
  }
};

exports.getAllQuestionsController = async (req, res) => {
  try {
    const id = req.params.id;
    const allQuestions = await model.find({ topicId: id });

    res.json({ allQuestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to get all questions. Please try again later.",
    });
  }
};

exports.deleteAllQuestionsController = async (req, res) => {
  const id = req.params.id;
  try {
    await model.findOneAndDelete({ _id: id }).exec();
    res.send("delete");
  } catch (err) {
    console.log(err);
  }
};

exports.getAllQuestionsByUsernameController = async (req, res) => {
  try {
    const { username } = req.params; // Assuming the username is passed in the URL params
    const questionsByUser = await model.find({ username: username });
    res.json({ questionsByUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to get questions by username. Please try again later.",
    });
  }
};
