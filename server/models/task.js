const mongoose = require("mongoose");
const taskTypes = require("../util/task-types");
const randomAlphaNumberic = require('../util/randomAlphaNumeric');

const taskSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String },
    type: { type: String }
}, {
  versionKey: false
});

const taskModel = mongoose.model("tasks", taskSchema);

const createRoom = async (name, type) => {
    // Validate if given type is in the allowed task types
    switch (type) {
        case taskTypes.Article:
            break;
        case taskTypes.Quiz:
            break;
        case taskTypes.Video:
            break;
        default:
            throw "Invalid task type";
    }

	return taskModel.create({
		_id: randomAlphaNumberic.generateRandomAlphaNumeric(),
        name: name,
        type: type
	});
};

const doesRoomExist = async (id) => {
	return taskModel.exists({ _id: id });
};

const getTask = async (id) => {
	return taskModel.findById(id);
};

const getAllTasks = async () => {
    return taskModel.find({});
};

const updateTask = async (id, updateJson) => {
	return taskModel.findByIdAndUpdate(id, updateJson, { new: true });
};

module.exports = { createRoom, doesRoomExist, getTask, getAllTasks, updateTask };