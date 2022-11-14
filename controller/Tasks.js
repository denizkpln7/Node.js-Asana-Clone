const { insert, list, modify, remove, findOne } = require("../services/Tasks");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Tasks = require("../model/Tasks");

const index = (req, res, next) => {
  list()
    .then((otherName) => {
      res.status(httpStatus.OK).send(otherName);
    })
    .catch((err) => {
      res.status(httpStatus.BAD_REQUEST);
    });
};

const create = (req, res, next) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((otherName) => {
      res.status(httpStatus.CREATED).send(otherName);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const update = (req, res) => {
  if (!req.params.id)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "ıd bilgisi eksik" });
  modify(req.body, req.params?.id)
    .then((otherName) => {
      res.status(httpStatus.CREATED).send(otherName);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const deleteSec = (req, res) => {
  if (!req.params.id)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "ıd bilgisi eksik" });

  remove(req.params?.id)
    .then((otherName) => {
      res.status(httpStatus.CREATED).send(otherName);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const makeComment = (req, res) => {
  findOne({ _id: req.params.id }).then((res) => {
    if (!res) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    const commentObject = {
      ...req.body,
      commented_at: new Date(),
      user_id: req.user,
    };
    res.comments.push(commentObject);
    res
      .save()
      .then((res) => {
        return res.status(httpStatus.OK).send({ message: "kaydedildi" });
      })
      .res.status(httpStatus.BAD_REQUEST)
      .send({ message: "ıd bilgisi eksik" });
  });
};

const deleteComment = (req, res) => {
  findOne({ _id: req.params.id }).then((res) => {
    if (!res) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    res.comments.filter((c) => c._id?.toString() != req.params.commentId);
    res
      .save()
      .then((res) => {
        return res.status(httpStatus.OK).send({ message: "kaydedildi" });
      })
      .res.status(httpStatus.BAD_REQUEST)
      .send({ message: "ıd bilgisi eksik" });
  });
};

const addSubTask = (req, res) => {
  findOne({ _id: req.params.id }).then((res) => {
    if (!res)
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("task yok");

    req.body.user_id = req.user;
    insert(req.body)
      .then((subTasks) => {
        res.sub - Tasks.push(subTasks);
        res.save().then((res) => {
          res.send("başarılı");
        });
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  });
};

const fetchTask = (req, res) => {
  findOne({ _id: req.params.id }, true)
    .then((res) => {
      if (!res)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("task yok");
      res.status(httpStatus.ok).send(task);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

module.exports = {
  create,
  index,
  update,
  deleteSec,
  makeComment,
  deleteComment,
  addSubTask,
  fetchTask,
};
