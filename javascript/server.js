const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configurar el middleware para procesar datos JSON
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


// Configurar la conexión con la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Reemplaza con tu usuario de MySQL
    password: '123456',  // Reemplaza con tu contraseña
    database: 'reservas'
});


// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.get('/reservas', (req, res) => {
    const sql = 'SELECT * FROM reservas';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error detallado:', err);  // Agregar este log
            return res.status(500).send('Error al obtener reservas');
        }

        res.json(results);
    });
});


// Ruta para eliminar una reserva por su ID
app.delete('/reservas/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM reservas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send('Error al eliminar la reserva');
        }
        res.send('Reserva eliminada con éxito');
    });
});

const cron = require('node-cron');

// Eliminar reservas expiradas cada 24 horas (a la medianoche)
cron.schedule('0 0 * * *', () => {
    console.log('Ejecutando tarea de eliminación de reservas expiradas');

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = 'DELETE FROM reservas WHERE CONCAT(fecha, " ", hora) < ?';

    db.query(sql, [now], (err, result) => {
        if (err) {
            console.error('Error al eliminar reservas expiradas:', err);
        } else {
            console.log(`${result.affectedRows} reservas expiradas eliminadas`);
        }
    });
});



app.post('/reservas', (req, res) => {
    const { nombre, telefono, fecha, hora } = req.body;

    // Obtener la fecha y hora actuales
    const ahora = new Date(); // Ahora incluye tanto la fecha como la hora actuales

    // Combinar la fecha y hora proporcionadas por el usuario en un solo objeto Date
    const fechaReserva = new Date(`${fecha}T${hora}`);

    // Verificar si la fecha y hora de la reserva es anterior al momento actual
    if (fechaReserva < ahora) {
        return res.status(400).json({ mensaje: 'No puedes reservar para fechas y horas anteriores al momento actual. Por favor elige una fecha futura o el día de hoy.' });
    }

    // Verificar si ya existe una reserva para la misma fecha
    const checkSql = 'SELECT * FROM reservas WHERE fecha = ?';
    db.query(checkSql, [fecha], (err, results) => {
        if (err) {
            console.error('Error al verificar la fecha en la base de datos:', err);
            return res.status(500).json({ mensaje: 'Error al verificar la fecha' });
        }

        if (results.length > 0) {
            return res.status(400).json({ mensaje: 'Ya existe una reserva para esta fecha. Por favor, elige otra.' });
        }

        // Si no hay teléfono, lo dejamos como NULL o vacío en la base de datos
        const insertSql = 'INSERT INTO reservas (nombre, telefono, fecha, hora) VALUES (?, ?, ?, ?)';
        db.query(insertSql, [nombre, telefono || null, fecha, hora], (err, result) => {
            if (err) {
                console.error('Error al crear la reserva:', err);
                return res.status(500).json({ mensaje: 'Error al crear reserva' });
            }
            res.status(201).json({ mensaje: 'Reserva creada con éxito' });
        });
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
