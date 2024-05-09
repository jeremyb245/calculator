const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

// Hide SQL credentials
require('dotenv').config();

// MySQL Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Calculator operations
app.post('/calculate', (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const operation = req.body.operation;
    let result;

    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
        default:
            result = 'Invalid operation';
    }

    // Save to database
    const sql = 'INSERT INTO calculations (num1, num2, operation, result) VALUES (?, ?, ?, ?)';
    connection.query(sql, [num1, num2, operation, result], (err, result) => {
        if (err) {
            console.error('Error saving calculation to database: ', err);
            res.render('index', { error: 'Error occurred, please try again' });
            return;
        }
        console.log('Calculation saved to database');
        res.render('index', { result });
    });
});

// Show in history
app.get('/history', (req, res) => {
    const sql = 'SELECT * FROM calculations ORDER BY id DESC';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching calculation history from database: ', err);
            res.render('history', { error: 'Error occurred, please try again' });
            return;
        }
        console.log('Calculation history fetched from database');
        res.render('history', { calculations: results });
    });
});

// Delete history
app.post('/history/:id/delete', (req, res) => {
    const calculationId = req.params.id;
    const sql = 'DELETE FROM calculations WHERE id = ?';
    connection.query(sql, [calculationId], (err, result) => {
        if (err) {
            console.error('Error deleting calculation from database: ', err);
            res.render('history', { error: 'Error occurred, please try again' });
            return;
        }
        console.log('Calculation deleted from database');
        // Redirect to history page after deletion
        res.redirect('/history');
    });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
