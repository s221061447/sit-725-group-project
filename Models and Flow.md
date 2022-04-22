<h1 style="text-align: center">SIT-725 Group Project - covED</h1>



## Models

###### Admin

- id
- name
- email

###### Task

- type
- id
- name
- data (Not part of the mongodb data. Data will be stored locally in the form of html template literals. This will be queried by the id under a specific folder in our application and returned to the front end)

###### Organization

- id
- name
- domain
- email
- managers: [... managerID]
- users: [... userID]
- tasks: [... taskID]

###### Room

- id
- name
- organizationID
- manager
- users: [... userID]

###### Manager

- id
- email
- name
- organizationID
- rooms: [... roomID]

###### User

- id

- email

- name

- organization ID

- rooms: [... roomID]

- progress: [

  ​	... {

  ​		task-id

  ​		completed (Boolean)

  ​	}

  ]

#### ID Formats

A hyphen or dash will be used as the delimiter for room IDs (-)

1. Task ID -> random alphanumeric
2. organization ID -> random alphanumeric
3. Room ID -> "organizationID-random alphanumeric"
4. Admin ID -> murmurhash32 of email
5. Manager ID -> murmurhash32 of email
6. User ID -> murmurhash32 of email



## Flow

organization -> Creates account
Once admin approves
organization -> Separate page to select curriculum and select tasks
organization -> Manage users (See list of users and managers)
organization -> View overall dashboard

Admin -> Approve or deny organization
Admin -> Manage Users (See list of users by role and organization)

Manager -> Sign up
Manager -> Creates room
Manager -> Approvals page for users who's requested to join class
Manager -> Page to list users in each room
Manager -> Page to show progress

User -> Sign up
User -> List of rooms in organization -> Selects the appropriate units
Once manager approves
User -> Has access to content selected by organization
User -> Page to show progress per room