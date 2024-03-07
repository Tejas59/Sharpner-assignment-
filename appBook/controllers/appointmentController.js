const mysql = require('mysql');

// Create connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tejas@555',
    database: 'node'
});

// Connect to database
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected');
});

exports.createAppointment = (req, res) => {
    const { name, date, time } = req.body;
    const INSERT_APPOINTMENT_QUERY = `INSERT INTO appointments (name, date, time) VALUES (?, ?, ?)`;
    db.query(INSERT_APPOINTMENT_QUERY, [name, date, time], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Failed to insert appointment' });
        } else {
            res.status(201).send({ message: 'Appointment inserted successfully' });
        }
    });
};

exports.getAllAppointments = (req, res) => {
    const SELECT_APPOINTMENTS_QUERY = `SELECT * FROM appointments`;
    db.query(SELECT_APPOINTMENTS_QUERY, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Failed to fetch appointments' });
        } else {
            res.status(200).send(result);
        }
    });
};

exports.deleteAppointment = (req, res) => {
    const { id } = req.params;
    const DELETE_APPOINTMENT_QUERY = `DELETE FROM appointments WHERE id = ?`;
    db.query(DELETE_APPOINTMENT_QUERY, id, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Failed to delete appointment' });
        } else {
            res.status(200).send({ message: 'Appointment deleted successfully' });
        }
    });
};
