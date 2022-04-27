<h1 style="text-align: center">SIT-725 Group Project - covED</h1>



## Models

##### Admin

- id
- name
- email

##### Task

- type
- id
- name
- data (Not part of the mongodb data. Data will be stored locally in the form of html template literals. This will be queried by the id under a specific folder in our application and returned to the front end)

##### Organization

- id
- name
- domain
- email
- managers: [... managerID]
- users: [... userID]
- tasks: [... taskID]
- isActive

##### Room

- id
- name
- organizationID
- manager
- users: [... userID]

##### Manager

- id
- email
- name
- organizationID
- rooms: [... roomID]
- isActive

##### User

- id
- email
- name
- organization ID
- rooms: [... roomID]
- progress: [<br>
  ​&emsp;... {<br>
  ​		​&emsp;​&emsp;task-id<br>
  ​		​&emsp;​&emsp;completed (Boolean)<br>
  ​&emsp;}<br>
  ]<br>
- isActive

#### ID Formats

A hyphen or dash will be used as the delimiter for room IDs (-)

1. Task ID -> random alphanumeric
2. organization ID -> random alphanumeric
3. Room ID -> "organizationID-random alphanumeric"
4. Admin ID -> murmurhash32 of email
5. Manager ID -> murmurhash32 of email
6. User ID -> murmurhash32 of email



## Flow

organization -> Creates account<br>
Once admin approves<br>
organization -> Separate page to select curriculum and select tasks<br>
organization -> Manage users (See list of users and managers)<br>
organization -> View overall dashboard<br>

Admin -> Approve or deny organization<br>
Admin -> Manage Users (See list of users by role and organization)<br>

Manager -> Sign up<br>
Manager -> Creates room<br>
Manager -> Approvals page for users who's requested to join class<br>
Manager -> Page to list users in each room<br>
Manager -> Page to show progress<br>

User -> Sign up<br>
User -> List of rooms in organization -> Selects the appropriate units<br>
Once manager approves<br>
User -> Has access to content selected by organization<br>
User -> Page to show progress per room<br>