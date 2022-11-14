const mongoose = require("mongoose");

const Taskschema = new mongoose.Schema(
  {
    title: String,
    description: String,
    assigned_to: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    due_date: Date,
    statuses: [String],
    section_id: {
      type: mongoose.Types.ObjectId,
      ref: "Section",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
    order: Number,
    isCompleted: Boolean,
    comments: [
      {
        comment: String,
        comment_at: Date,
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    media: [String],
    sub_tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", Taskschema);
