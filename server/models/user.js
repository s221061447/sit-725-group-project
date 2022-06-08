const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    token: { type: String },
	organizationId: { type: String },
	rooms: [String],
	progress: [{
		taskId: String,
		completed: Boolean
	}],
	isActive: { type: Boolean }
}, {
  versionKey: false
});

const userModel = mongoose.model("users", userSchema);

const createUser = async (id, firstName, lastName, email, password, role, token, organizationId, isActive) => {
	return userModel.create({
		_id: id,
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
		role: role,
		token: token,
		organizationId: organizationId,
		rooms: [],
		progress: [],
		isActive: isActive
	});
};

const doesUserExist = async (id) => {
	return userModel.exists({ _id: id });
};

const getUser = async (id) => {
	return userModel.findById(id);
};

const getUserWithoutPassword = async (id) => {
	return userModel.findById(id, { password: 0 });
};

// Get all the users belonging to an organization by providing organization ID
const getAllUsersInOrganization = async (organizationId) => {
    return await userModel.find({ organizationId: organizationId }, { password: 0 });
};

const updateUser = async (id, updateJson) => {
	return userModel.findByIdAndUpdate(id, updateJson, { new: true });
};

const deleteUser = async (id) => {
	await userModel.deleteOne({ _id: id });
};

const disableUser = async (id) => {
	return updateUser(id, { isActive: false });
};

const enableUser = async (id) => {
	return updateUser(id, { isActive: true });
};

const getAllUsers = async () => {
	return await userModel.find({}, { password: 0 });
};

// Add a room to the user by providing user ID and room ID
const addRoomToUser = async (roomId, userId) => {
    await userModel.updateOne(
        { _id: userId }, 
        { $push: { rooms: roomId } }
    );
};

// Remove a room from the user by providing user ID and room ID
const removeRoomFromUser = async (roomId, userId) => {
    await userModel.updateOne(
        { _id: userId }, 
        { $pull: { rooms: { $eq: roomId } } }
    );
};

module.exports = { createUser, doesUserExist, getUser, getUserWithoutPassword, getAllUsersInOrganization, updateUser, deleteUser, disableUser,
	enableUser, getAllUsers, addRoomToUser, removeRoomFromUser };