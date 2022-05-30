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

// Create a room by providing name, organizationId, and managerId
const createRoom = async (name, organizationId, managerId) => {
	return roomModel.create({
		_id: organizationId.concat('-', randomAlphaNumberic.generateRandomAlphaNumeric()),
		name: name,
        organizationId: organizationId,
        managerId: managerId,
        users: []
	});
};

// Check to see if a room exists
const doesRoomExist = async (id) => {
	return roomModel.exists({ _id: id });
};

// Get room by providing room ID
const getRoom = async (id) => {
	return roomModel.findById(id);
};

// Get all rooms
const getAllRooms = async () => {
	return roomModel.find({});
};

// Get all the rooms belonging to an organization by providing organization ID
const getAllRoomsInOrganization = async (organizationId) => {
    return roomModel.find({ _id: { $regex: '^' + organizationId, $options: 'i' } });
};

// Update a room using an update JSON
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

module.exports = { createRoom, doesRoomExist, getRoom, updateRoom, addUserToRoom, removeUserFromRoom };