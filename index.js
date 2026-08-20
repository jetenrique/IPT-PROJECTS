const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('students.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database (students.db).');
    }
});


db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS students (
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


db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
