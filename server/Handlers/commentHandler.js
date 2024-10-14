const model = require("../MongoDB_Schemas/commentSchema");
exports.addCommentController = async (req, res) => {
  try {
    const { title, username, rating, review, userInfo, id } = req.body;
    const checkALreadyCommentedOrNOT = await model.findOne({ username, title });
    if (checkALreadyCommentedOrNOT) {
      return res.json({ message: "Please Edit the Existing comment" });
    }
    const comment = new model({
      title,
      username,
      rating,
      review,
      userInfo,
      id,
    });
    await comment.save();
    res.json({ message: "Thanks for review" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add Topic. Please try again later.",
    });
  }
};
exports.getCommentByTitleController = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await model.find({ id });
    res.json(comments);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteCommentController = async (req, res) => {
  const id = req.params.id;
  try {
    await model.findOneAndDelete({ _id: id }).exec();
    res.send("delete");
  } catch (err) {
    console.log(err);
  }
};
exports.updateCommentController = async (req, res) => {
  const { rating, review, commentId } = req.body;
  try {
    const update = await model.findById({ _id: commentId }).exec();

    if (!update) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    update.rating = rating;
    update.review = review;
    await update.save();

    res.json({
      message: "Comment Updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
exports.getCommentController = async (req, res) => {
  try {
    const comments = await model.find().lean();
    res.json(comments);
  } catch (err) {
    console.log(err);
  }
};
