# SIT 725 Group Project

### Authors

1. [Paul Jose](https://github.com/s221061447)
2. [Swathi Chandrasekhar](https://github.com/SwathiReddy1862)
3. [Malik Muhammad Saqib Javed](https://github.com/javedsaqib94)
4. [Ishwari Bipin](https://github.com/ishwarikamat7)

### Server - NodeJS

The backend is built using NodeJS and will run on port 8000.
This project will use bcryptjs to hash passwords, and murmurhash3 to hash email and generate user ID.
JWT will be used to authentication and authorization. The algorithm for key generation is ECDSA256. The repository contains a sample private and public key, but this will not be used during production deployment.

##### Installation

```bash
cd ./server
npm install
npm run start
# For dev environment
npm run dev
```

##### Dependencies

1. mongoose
2. express
3. jsonwebtoken
4. dotenv
5. bcryptjs
6. murmurhash3
7. nodemon (dev-dependencies)



#### Use our project Docker Image

1. install docker in OS
2. Create container in your Docker and pull and run that image on it 
3. pull image from dockerHub "docker pull javedsaqib/sit-725-group-project"
3. 