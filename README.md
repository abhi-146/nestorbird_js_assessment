## Introduction
This project is used to schedule the tasks. You can add new tasks for today or any time in future. You can change to any date and view your tasks for that day.

## Prerequisites

Before you start, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- PostgreSQL

#### Installing Node.js and npm

1. Go to [Node.js official website](https://nodejs.org/).
2. Download the installer for your operating system. You should download the LTS (Long Term Support) version recommended for most users.
3. Run the installer (the .msi file for Windows or .pkg for macOS) and follow the instructions to install Node.js and npm.

### Installing PostgreSQL

This project interacts with a PostgreSQL database, so you'll need to have PostgreSQL installed on your system. You can download and install PostgreSQL from the official PostgreSQL website: https://www.postgresql.org/download/

### Installing node modules (Express, pg and cors)

```bash
npm update
```

## Setup

### Step 1 : Clone the repo:

Use command:
```bash
git clone https://github.com/abhi-146/nestorbird_js_assessment.git
```

cd to cloned folder.

### Step 2: Create the database

Use command:
```bash
psql 
```

The above command will enter into postreSQL shell. Then use command:
```bash
CREATE DATABASE databse_name;
```

### Step 3: Run server.js

```bash
node server.js
```

- This will create a table 'tasks' in the specified database.
- This will initialise two endpoints '/addTask' to add a new task and '/tasks' to get the tasks for any particular day.


### Step 4: Run index.html

Run index.html in any browser.

## Note: 
Change credentials to connect the database in server.js at line 8

```bash
const connectionString = 'postgresql://username:password@host:port/database_name';
```
