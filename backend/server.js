const express = require('express');
const cors = require('cors'); // Import the cors middleware
const mysql = require('mysql2');

const app = express();
app.use(cors());

const port = 3001; // Choose a port for your server

// Create a MySQL database connection
const db = mysql.createConnection({
  host: '127.0.0.1', // Replace with your database host
  user: 'root', // Replace with your MySQL username
  password: 'Kimdy0201!', // Replace with your MySQL password
  database: 'karaoke_assistant', // Replace with your MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define a route for querying based on pitch
app.get('/api/songs', (req, res) => {
  // Extract the pitch value from the request query parameters
  const vocal_name = req.query.vocal_name;
  //WHERE v.name = '?'
  //, [`${vocal_name}`]
  db.query(`
        SELECT s.title, v.name as vocal_range, a.name as artist_name, l.name as language, s.release_year
        FROM songs s
        INNER JOIN vocal_ranges v ON v.vocal_range_id = s.vocal_range_id
        INNER JOIN artists a ON a.artist_id = s.artist_id
        INNER JOIN languages l on l.language_id = s.language_id
        `, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results); // Send the matching results as JSON response
      return res;
    } 
  });  
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
