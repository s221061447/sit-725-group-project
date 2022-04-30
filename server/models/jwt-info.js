class JwtInfo {
    constructor(id, firstName, lastName, email, organizationId, rooms, role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.organizationId = organizationId;
        this.rooms = rooms;
        this.role = role;
    }

    getObject() {
        let jwt = {};

        if (this.id != null) {
            jwt.id = this.id;
        }

        if (this.firstName != null) {
            jwt.firstName = this.firstName;
        }

        if (this.lastName != null) {
            jwt.lastName = this.lastName;
        }

        if (this.email != null) {
            jwt.email = this.email;
        }

        if (this.organizationId != null) {
            jwt.organizationId = this.organizationId;
        }

        if (this.rooms != null) {
            jwt.rooms = this.rooms;
        }

        if (this.role != null) {
            jwt.role = this.role;
        }
        return jwt;
    }
}

module.exports = JwtInfo;