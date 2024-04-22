const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000; 

const connectionString = 'postgresql://zain:pass@localhost:5432/nestorbird';

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Function to create a table if it doesn't exist
async function createTableIfNotExists() {
    const client = new Client({
        connectionString: connectionString
    });

    try {
        await client.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                task_date TEXT,
                start_time TIME,
                end_time TIME
            )
        `);
        console.log('Table created successfully or already exists.');
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        await client.end();
    }
}


// Function to insert task data into the tasks table
async function insertTask(title, date, startTime, endTime) {
    const client = new Client({
        connectionString: connectionString
    });

    try {
        await client.connect();
        const query = {
            text: 'INSERT INTO tasks (title, task_date, start_time, end_time) VALUES ($1, $2, $3, $4)',
            values: [title, date, startTime, endTime]
        };
        await client.query(query);
        console.log('Task inserted successfully.');
    } catch (err) {
        console.error('Error inserting task:', err);
    } finally {
        await client.end();
    }
}
// Endpoint to receive data from frontend and insert into database
app.post('/addTask', async (req, res) => {
    const { title, date, startTime, endTime } = req.body;

    try {
        await insertTask(title, date, startTime, endTime);
        res.status(201).json({ message: 'Task inserted successfully' });
    } catch (error) {
        console.error('Error inserting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get tasks overlapping with selected date
app.get('/tasks', async (req, res) => {
    var selectedDate = req.query.date; // Get selected date from query parameters
    console.log(selectedDate);

    const client = new Client({
        connectionString: connectionString
    });

    try {
        await client.connect();
        const query = {
            text: `
            SELECT * FROM tasks WHERE task_date = $1
            `,
            values: [selectedDate]
        };
        const result = await client.query(query);
        const tasks = result.rows;
        res.json(tasks);
    } catch (err) {
        console.error('Error retrieving tasks:', err);
        res.status(500).json({ error: 'An error occurred while retrieving tasks' });
    } finally {
        await client.end();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    createTableIfNotExists(); // Ensure table exists when server starts
});
