const mongoose = require("mongoose");
const randomAlphaNumberic = require('../util/randomAlphaNumeric');

const roomSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String },
    organizationId: { type: String },
    managerId: { type: String },
    users: [String]
}, {
  versionKey: false
});

const roomModel = mongoose.model("rooms", roomSchema);

const createRoom = async (name, organizationId, managerId) => {
	return roomModel.create({
		_id: organizationId.concat('-', randomAlphaNumberic.generateRandomAlphaNumeric()),
		name: name,
        organizationId: organizationId,
        managerId: managerId,
        users: []
	});
};

const doesRoomExist = async (id) => {
	return roomModel.exists({ _id: id });
};

const getRoom = async (id) => {
	return roomModel.findById(id);
};

const updateRoom = async (id, updateJson) => {
	return roomModel.findByIdAndUpdate(id, updateJson, { new: true });
};

// Add a user to the room by providing room ID and user ID
const addUserToRoom = async (roomId, userId) => {
    roomModel.updateOne(
        { _id: userId }, 
        { $push: { rooms: roomId } }
    );
};

// Remove a user from the room by providing room ID and user ID
const removeUserFromRoom = async (roomId, userId) => {
    roomModel.updateOne(
        { _id: userId }, 
        { $pull: { rooms: { $eq: roomId } } }
    );
};

module.exports = { doesRoomExist, getRoom, updateRoom, addUserToRoom, removeUserFromRoom };