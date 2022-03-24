class JwtInfo {
    constructor(id, first_name, last_name, email, role) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
    }

    getObject() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role: this.role
        }
    }
}

module.exports = JwtInfo;