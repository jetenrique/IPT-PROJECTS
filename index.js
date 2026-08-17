// Install sqlite3 first by running: npm install sqlite3

const sqlite3 = require('sqlite3').verbose();

// Step 1: Connect to database (creates file if not exists)
let db = new sqlite3.Database('students.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database (students.db).');
    }
});

// Use db.serialize to ensure queries run sequentially
db.serialize(() => {
    // Reset table so each run starts fresh with exactly 2 records
    db.run(`DROP TABLE IF EXISTS students`);

    // Step 2: Create a table named 'students'
    db.run(`CREATE TABLE students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        course TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "students" ready.');
        }
    });

    // Step 3: Insert 2 sample data records
    const insertStmt = "INSERT INTO students (name, course) VALUES (?, ?)";

    db.run(insertStmt, ["Maria", "BSIT"], function (err) {
        if (err) {
            console.error('Error inserting Maria:', err.message);
        } else {
            console.log(`Inserted record for Maria with ID: ${this.lastID}`);
        }
    });

    db.run(insertStmt, ["Jose", "BSCS"], function (err) {
        if (err) {
            console.error('Error inserting Jose:', err.message);
        } else {
            console.log(`Inserted record for Jose with ID: ${this.lastID}`);
        }
    });

    // Step 4: Query data
    db.all("SELECT * FROM students", [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('\n--- Student Records ---');
        rows.forEach((row) => {
            console.log(`ID: ${row.id}, Name: ${row.name}, Course: ${row.course}`);
        });
        console.log('-----------------------\n');
    });
});

// Step 5: Close connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
