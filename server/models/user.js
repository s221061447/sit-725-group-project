const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    token: { type: String },
	isActive: { type: Boolean }
}, {
  versionKey: false
});

const userModel = mongoose.model("users", userSchema);

const createUser = async (id, firstName, lastName, email, password, role, token, isActive) => {
	return userModel.create({
		_id: id,
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
		role: role,
		token: token,
		isActive: isActive
	});
};

const doesUserExist = async (id) => {
	return userModel.exists({ _id: id });
};

const getUser = async (id) => {
	return userModel.findById(id);
};

const updateUser = async (id, updateJson) => {
	return userModel.findByIdAndUpdate(id, updateJson, { new: true });
};

module.exports = { createUser, doesUserExist, getUser, updateUser };