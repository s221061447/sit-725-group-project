const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    token: { type: String },
    domain: { type: String },
    managers: [String],
    users: [String],
    tasks: [String],
	isActive: { type: Boolean }
}, {
  versionKey: false
});

const organizationModel = mongoose.model("organizations", organizationSchema);

const createOrganization = async (id, firstName, lastName, email, password, role, token, domain, managers, users, tasks, isActive) => {
	return organizationModel.create({
		_id: id,
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
		role: role,
		token: token,
        domain: domain,
        managers: managers,
        users: users,
        tasks: tasks,
		isActive: isActive
	});
};

// Check if organization with given ID exists
const doesOrganizationExist = async (id) => {
	return organizationModel.exists({ _id: id });
};

// Get organization details with ID
const getOrganization = async (id) => {
	return organizationModel.findById(id);
};

// Get organization domain with ID
const getOrganizationDomain = async (id) => {
    return organizationModel.findOne({ _id: id }, 'domain');
}

// Update organization details by providing ID and the json to update with
const updateOrganization = async (id, updateJson) => {
	return organizationModel.findByIdAndUpdate(id, updateJson, { new: true });
};

// Add a user to the organization by providing organization ID and user ID
const addUserToOrganization = async (organizationId, userId) => {
    organizationModel.updateOne(
        { _id: organizationId }, 
        { $push: { users: userId } }
    );
};

// Remove a user from the organization by providing organization ID and user ID
const removeUserFromOrganization = async (organizationId, userId) => {
    organizationModel.updateOne(
        { _id: organizationId }, 
        { $pull: { users: { $eq: userId } } }
    );
};

// Add a manager to the organization by providing organization ID and manager ID
const addManagerToOrganization = async (organizationId, managerId) => {
    organizationModel.updateOne(
        { _id: organizationId }, 
        { $push: { managers: managerId } }
    );
};

// Remove a manager from the organization by providing organization ID and manager ID
const removeManagerFromOrganization = async (organizationId, managerId) => {
    organizationModel.updateOne(
        { _id: organizationId }, 
        { $pull: { managers: { $eq: managerId } } }
    );
};

// Add a task to the organization by providing organization ID and task ID
const addTaskToOrganization = async (organizationId, taskId) => {
    organizationModel.updateOne(
        { _id: organizationId }, 
        { $push: { tasks: taskId } }
    );
};

// Remove a task from the organization by providing organization ID and task ID
const removeTaskFromOrganization = async (organizationId, taskId) => {
    organizationModel.updateOne(
        { _id: organizationId }, 
        { $pull: { tasks: { $eq: taskId } } }
    );
};

// Activate organization by setting isActive field to true
const activateOrganization = async (organizationId) => {
    return updateOrganization(userId, { isActive: true });
};

// De-activate organization by setting isActive field to false
const deActivateOrganization = async (organizationId) => {
    return updateOrganization(userId, { isActive: false });
};

// Delete organization by ID
const deleteOrganization = async (organizationId) => {
    return organizationModel.findByIdAndDelete(id);
}

module.exports = { createOrganization, doesOrganizationExist, getOrganization, updateOrganization, getOrganizationDomain,
    addUserToOrganization, removeUserFromOrganization, addManagerToOrganization, removeManagerFromOrganization,
    addTaskToOrganization, removeTaskFromOrganization, activateOrganization, deActivateOrganization, deleteOrganization };