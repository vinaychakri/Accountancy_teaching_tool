const fs = require("fs");
const model = require("../MongoDB_Schemas/topicSchema");
exports.addTopicController = async (req, res) => {
  try {
    const {
      title,
      level,
      purpose,
      type,
      details,
      reference,
      description,
      imageInfo,
      userInfo,
    } = req.body;

    const topicCheck = await model.findOne({ title });
    if (topicCheck) {
      return res.status(409).json({
        message: "Topic already exists. Enter a new Topic!",
      });
    }
    if (!req.file || !req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        message: "Only images are allowed!",
      });
    }
    // Read the image file asynchronously
    const imagePath = `uploads/${req.file.filename}`;
    const image = await fs.promises.readFile(imagePath);

    const topic = new model({
      title,
      level,
      purpose,
      type,
      details,
      reference,
      description,
      imageInfo,
      img: {
        data: image,
        contentType: "image/png",
      },
      userInfo,
    });
    await topic.save();
    res.json({ message: "Topic added successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add Topic. Please try again later.",
    });
  }
};
exports.updateTopicController = async (req, res) => {
  const {
    title,
    level,
    purpose,
    type,
    details,
    reference,
    description,
    imageInfo,
    userInfo,
    id,
  } = req.body;

  try {
    const topic = await model.findById(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Check if req.file is defined before accessing its properties
    let imagePath = "";
    let image = null;

    if (req.file && req.file.filename) {
      imagePath = `uploads/${req.file.filename}`;
      image = await fs.promises.readFile(imagePath);
    }

    // Compare each property before updating
    if (title && title !== topic.title) {
      topic.title = title;
    }
    if (level && level !== topic.level) {
      topic.level = level;
    }
    if (purpose && purpose !== topic.purpose) {
      topic.purpose = purpose;
    }
    if (type && type !== topic.type) {
      topic.type = type;
    }
    if (details && details !== topic.details) {
      topic.details = details;
    }
    if (description && description !== topic.description) {
      topic.description = description;
    }
    if (reference && reference !== topic.reference) {
      topic.reference = reference;
    }
    if (imageInfo && imageInfo !== topic.imageInfo) {
      topic.imageInfo = imageInfo;
    }
    if (userInfo && userInfo !== topic.userInfo) {
      topic.userInfo = userInfo;
    }

    if (image) {
      topic.img = {
        data: image,
        contentType: "image/png",
      };
    }

    await topic.save();

    res.json({
      message: "Topic Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTopicController = async (req, res) => {
  try {
    const topics = await model.find().lean();
    res.json(topics);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteTopicController = async (req, res) => {
  const id = req.params.id;
  try {
    // Use findOneAndDelete instead of findByIdAndRemove
    await model.findOneAndDelete({ _id: id }).exec();
    res.send("delete");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
