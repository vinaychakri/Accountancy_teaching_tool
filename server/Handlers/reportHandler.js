const model = require("../MongoDB_Schemas/reportSchema");
exports.addReportController = async (req, res) => {
  try {
    const { topicName, reason, reportedBy, suggestions, createdBy } = req.body;

    const report = new model({
      topicName,
      reason,
      reportedBy,
      suggestions,
      createdBy,
    });
    await report.save();
    res.json({ message: "Topic Reported" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add Topic. Please try again later.",
    });
  }
};
exports.getReportController = async (req, res) => {
  try {
    const reports = await model.find().lean();
    res.json(reports);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteReportController = async (req, res) => {
  const id = req.params.id;
  try {
    await model.findOneAndDelete({ _id: id }).exec();
    res.send("delete");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
