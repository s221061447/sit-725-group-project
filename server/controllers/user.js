const express = require('express');
const router = express.Router();
const { doesUserExist, getUserWithoutPassword, getAllUsersInOrganization, deleteUser, disableUser,
	enableUser, getAllUsers, addRoomToUser, removeRoomFromUser } = require("../models/user");
const { authorize } = require('../middleware/jwt');
const roles = require("../util/roles");

router.get('/doesUserExist/:id', authorize(roles.Admin), async (req, res) => {
    try {
        const id = req.params.id;
        const result = await doesUserExist(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.get('/getAllUsers', authorize(roles.Admin), async (req, res) => {
    try {
        const result = await getAllUsers();
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.get('/getUser/:id', authorize([roles.Admin, roles.Manager, roles.Organization]), async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getUserWithoutPassword(id);

        if ((req.user.role == roles.Manager || req.user.role == roles.Organization) && (req.user.organizationId != result.organizationId)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.get('/getUser', authorize(roles.User), async (req, res) => {
    try {
        const id = req.user.id;
        const result = await getUserWithoutPassword(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.get('/getAllUsersInOrganization/:id', authorize(roles.Admin), async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getAllUsersInOrganization(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.get('/getAllUsersInOrganization', authorize([roles.Organization, roles.Manager]), async (req, res) => {
    try {
        const id = req.user.organizationId;
        const result = await getAllUsersInOrganization(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.delete('/deleteUser/:id', authorize(roles.Admin), async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUser(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.patch('/disableUser/:id', authorize(roles.Admin), async (req, res) => {
    try {
        const id = req.params.id;
        const result = await disableUser(id);
        if (result != null) {
            return res.status(200).send();
        } else {
            return res.status(409).send();
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.patch('/enableUser/:id', authorize(roles.Admin), async (req, res) => {
    try {
        const id = req.params.id;
        const result = await enableUser(id);
        if (result != null) {
            return res.status(200).send();
        } else {
            return res.status(409).send();
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.patch('/addRoomToUser', authorize(roles.Manager), async (req, res) => {
    try {
        const roomId = req.query.roomId;
        const userId = req.query.userId;

        const user = await getUserWithoutPassword(userId);

        if (req.user.organizationId != user.organizationId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await addRoomToUser(roomId, userId);
        return res.status(200).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

router.patch('/removeRoomFromUser', authorize(roles.Manager), async (req, res) => {
    try {
        const roomId = req.query.roomId;
        const userId = req.query.userId;

        const user = await getUserWithoutPassword(userId);

        if (req.user.organizationId != user.organizationId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await removeRoomFromUser(roomId, userId);
        return res.status(200).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
});

module.exports = router;