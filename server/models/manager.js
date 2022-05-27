const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    token: { type: String },
    organizationId: { type: String },
    rooms: [String],
	isActive: { type: Boolean }
}, {
  versionKey: false
});

const managerModel = mongoose.model("managers", managerSchema);

const createManager = async (id, firstName, lastName, email, password, role, token, organizationId, isActive) => {
	return managerModel.create({
		_id: id,
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
		role: role,
		token: token,
        organizationId: organizationId,
        rooms: [],
		isActive: isActive
	});
};

// Check if manager with given ID exists
const doesManagerExist = async (id) => {
	return managerModel.exists({ _id: id });
};

// Get manager details with ID
const getManager = async (id) => {
	return managerModel.findById(id);
};

// Update manager details by providing ID and the json to update with
const updateManager = async (id, updateJson) => {
	return managerModel.findByIdAndUpdate(id, updateJson, { new: true });
};

// Add a room to the manager by providing manager ID and room ID
const addRoomToManager = async (roomId, managerId) => {
    managerModel.updateOne(
        { _id: managerId }, 
        { $push: { rooms: roomId } }
    );
};

// Remove a room from the manager by providing manager ID and room ID
const removeRoomFromManager = async (roomId, managerId) => {
    managerModel.updateOne(
        { _id: managerId }, 
        { $pull: { rooms: { $eq: roomId } } }
    );
};

// Activate manager by setting isActive field to true
const activatemanager = async (managerId) => {
    return updateManager(managerId, { isActive: true });
};

// De-activate manager by setting isActive field to false
const deActivateManager = async (managerId) => {
    return updateManager(managerId, { isActive: false });
};

// Delete manager by ID
const deleteManager = async (managerId) => {
    return managerModel.findByIdAndDelete(managerId);
}

module.exports = { createManager, doesManagerExist, getManager, updateManager, addRoomToManager, removeRoomFromManager, activatemanager, deActivateManager, deleteManager };