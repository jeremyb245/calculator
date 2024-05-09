Calculator Web App

This is a simple calculator web application built with Node.js and Express.js. It allows users to perform basic calculations through a web interface.

- Perform addition, subtraction, multiplication, and division operations
- Display calculation history
- Delete calculation history entries

1. Clone this repository to your local machine:

2. Navigate to the project directory:

3. Install dependencies:

4. Create a `.env` file in the root directory and define your MySQL database connection details:

-DB_HOST=localhost
-DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=calculator_db


5. Create the MySQL database and table using the provided SQL script.

CREATE DATABASE calculator_db;

USE calculator_db;

CREATE TABLE calculations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num1 FLOAT NOT NULL,
    num2 FLOAT NOT NULL,
    operation ENUM('add', 'subtract', 'multiply', 'divide') NOT NULL,
    result FLOAT NOT NULL
);


6. Start the application: In the project directory run: node app.js



7. Open your web browser and navigate to `http://localhost:3000` to access the calculator.

How to use:
- Enter the first number in the "Enter first number" input field.
- Enter the second number in the "Enter second number" input field.
- Select the operation (addition, subtraction, multiplication, or division) from the dropdown menu.
- Click the "Calculate" button to see the result.
- View calculation history by clicking the "View Calculation History" link.


