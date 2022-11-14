const { populate } = require("../model/Tasks");
const Task = require("../model/Tasks");

const insert = async (data) => {
  console.log(data);
  const tasks = new Task(data);
  return await tasks.save();
};

const list = (id) => {
  return Task.find()
    .populate({
      path: "user_id",
      select: "full_name email",
    })
    .populate({
      path: "project_id",
      select: "name email",
    });
};

const modify = (data, id) => {
  return Task.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Task.findByIdAndDelete(id);
};

const findOne = (where, expand) => {
  if (expand) return Task.find(where);
  return Task.findOne(where)
    .populate({
      path: "user_id",
      select: "full_name , email, profile",
    })
    .populate({
      path: "comments",
      populate: {
        path: "user_id",
        select: "full_name , email, profile",
      },
    });
};

module.exports = {
  insert,
  list,
  modify,
  remove,
  findOne,
};
