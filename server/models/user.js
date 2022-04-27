const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    token: { type: String },
	is_active: { type: Boolean }
}, {
  versionKey: false
});

const userModel = mongoose.model("users", userSchema);

const createUser = async (id, firstName, lastName, email, password, role, token, isActive) => {
	return userModel.create({
		_id: id,
		first_name: firstName,
		last_name: lastName,
		email: email,
		password: password,
		role: role,
		token: token,
		is_active: isActive
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