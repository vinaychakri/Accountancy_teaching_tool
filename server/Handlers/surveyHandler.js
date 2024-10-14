const model = require("../MongoDB_Schemas/surveySchema");
exports.addSurveyController = async (req, res) => {
  try {
    const { userEmail, question1, question2, question3, question4 } = req.body;

    const userCheck = await model.findOne({ userEmail });
    if (userCheck) {
      return res.status(409).json({
        message: "You have already given a survey",
      });
    }

    const topic = new model({
      userEmail,
      question1,
      question2,
      question3,
      question4,
    });
    await topic.save();
    res.json({ message: "Thanks for you're valuable time" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add Topic. Please try again later.",
    });
  }
};
exports.getSurveyController = async (req, res) => {
  try {
    const surveys = await model.find().lean();
    res.json(surveys);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteSurveyController = async (req, res) => {
  const id = req.params.id;
  try {
    await model.findOneAndDelete({ _id: id }).exec();
    res.send("delete");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
