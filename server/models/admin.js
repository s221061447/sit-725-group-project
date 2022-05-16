const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    token: { type: String }
}, {
  versionKey: false
});

const adminModel = mongoose.model("admins", adminSchema);

const createAdmin = async (id, firstName, lastName, email, password, role, token) => {
	return adminModel.create({
		_id: id,
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
		role: role,
		token: token
	});
};

const doesAdminExist = async (id) => {
	return adminModel.exists({ _id: id });
};

const getAdmin = async (id) => {
	return adminModel.findById(id);
};

const updateAdmin = async (id, updateJson) => {
	return adminModel.findByIdAndUpdate(id, updateJson, { new: true });
};

const deleteAdmin = async (id) => {
    return adminModel.findByIdAndDelete(id);
}

module.exports = { createAdmin, doesAdminExist, getAdmin, updateAdmin, deleteAdmin };