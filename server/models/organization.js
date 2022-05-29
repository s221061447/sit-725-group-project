const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    _id: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    organizationName: { type: String },
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

const createOrganization = async (id, firstName, lastName, organizationName, email, password, role, token, domain, managers, users, tasks, isActive) => {
	return organizationModel.create({
		_id: id,
		firstName: firstName,
		lastName: lastName,
        organizationName: organizationName,
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
    return updateOrganization(organizationId, { isActive: true });
};

// De-activate organization by setting isActive field to false
const deActivateOrganization = async (organizationId) => {
    return updateOrganization(organizationId, { isActive: false });
};

// Delete organization by ID
const deleteOrganization = async (organizationId) => {
    return organizationModel.findByIdAndDelete(organizationId);
};

// Get all organization names along with domain and ID
const getAllOrganizationDomains = async () => {
    return organizationModel.find({}, ["_id, organizationName", "domain"]);
};

// Get all organization names along with ID of organization and users
const getAllOrganizationUsers = async () => {
    return organizationModel.find({}, ["_id, organizationName", "users"]);
};

// Get all organization names along with ID of organization and managers
const getAllOrganizationManagers = async () => {
    return organizationModel.find({}, ["_id, organizationName", "managers"]);
};

// Get all organization names along with ID of organization and tasks
const getAllOrganizationTasks = async () => {
    return organizationModel.find({}, ["_id, organizationName", "tasks"]);
};

// Get organization users by providing organization ID
const getOrganizationUsers = async (id) => {
    return organizationModel.findOne({ _id: id }, ["organizationName", "users"]);
};

// Get organization users by providing organization ID
const getOrganizationManagers = async (id) => {
    return organizationModel.findOne({ _id: id }, ["organizationName", "managers"]);
};

// Get organization users by providing organization ID
const getOrganizationTasks = async (id) => {
    return organizationModel.findOne({ _id: id }, ["organizationName", "tasks"]);
};

module.exports = { createOrganization, doesOrganizationExist, getOrganization, updateOrganization, getOrganizationDomain,
    addUserToOrganization, removeUserFromOrganization, addManagerToOrganization, removeManagerFromOrganization,
    addTaskToOrganization, removeTaskFromOrganization, activateOrganization, deActivateOrganization, deleteOrganization,
    getAllOrganizationDomains, getAllOrganizationUsers, getAllOrganizationManagers, getAllOrganizationTasks, getOrganizationUsers,
    getOrganizationManagers, getOrganizationTasks };