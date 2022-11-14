const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    project_id: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
    },
    order:Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", SectionSchema);
