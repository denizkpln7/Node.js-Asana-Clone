const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required().min(3),
  project_id: Joi.string(),
  section_id: Joi.string(),
  description: Joi.string().min(8),
  assigned_to: Joi.string().min(8),
  due_date: Joi.date(),
  statuses: Joi.array(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  comments: Joi.array(),
  media: Joi.array(),
  sub_tasks: Joi.array(),
});

module.exports = {
  createValidation,
};
