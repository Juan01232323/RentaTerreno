
// Función para obtener las reservas del LocalStorage
function obtenerReservas() {
    const reservas = localStorage.getItem('reservas');
    try {
        return reservas ? JSON.parse(reservas) : [];
    } catch (error) {
        console.error("Error al analizar reservas desde LocalStorage:", error);
        return [];
    }
}



// Función para guardar una nueva reserva en el LocalStorage
function guardarReserva(nombre, telefono, fecha, hora) {
    const reservas = obtenerReservas();
    reservas.push({ nombre, telefono, fecha, hora });
    localStorage.setItem('reservas', JSON.stringify(reservas));
    console.log(localStorage.getItem('reservas'));

}




// Función para obtener la última reserva del LocalStorage
function obtenerUltimaReserva() {
    const ultimaReserva = localStorage.getItem('ultimaReserva');
    return ultimaReserva ? JSON.parse(ultimaReserva) : null;
}

// Función para verificar si una fecha y hora ya está reservada
function verificarDisponibilidad(fecha) {
    const reservas = obtenerReservas();
    // Verifica si ya existe una reserva para la misma fecha
    return !reservas.some(reserva => reserva.fecha === fecha);
}


// Función para mostrar las reservas
function mostrarReservas() {
    const reservas = obtenerReservas();
    const userReservations = document.getElementById('userReservations'); // Cambia el ID aquí
    if (!userReservations) {
        console.error("El elemento con id 'userReservations' no existe en el DOM.");
        return;
    }

    userReservations.innerHTML = ''; // Limpiar la lista antes de mostrar las reservas

    reservas.forEach((reserva, index) => {
        const fechaConvertida = convertirFormatoFecha(reserva.fecha);
        const reservaElemento = document.createElement('li');
        reservaElemento.textContent = `Nombre: ${reserva.nombre}, Teléfono: ${reserva.telefono}, Fecha: ${fechaConvertida}, Hora: ${reserva.hora}`;
      
        
        userReservations.appendChild(reservaElemento);
    });
}


// Función para obtener las reservas desde el servidor (API)
function obtenerReservasServidor() {
    fetch('https://roughly-picked-humpback.ngrok-free.app/reservas')
        .then(response => response.json())
        .then(data => {
            mostrarReservasServidor(data);
        })
        .catch(error => {
            console.error('Error al obtener las reservas:', error);
        });
}

// Función para mostrar las reservas obtenidas del servidor, agregando un botón para eliminarlas
function mostrarReservasServidor(reservas) {
    const userReservations = document.getElementById('userReservations');

    if (!userReservations) {
        console.error("El elemento con id 'userReservations' no existe en el DOM.");
        return;
    }

    userReservations.innerHTML = ''; // Limpiar la lista antes de mostrar las reservas

    reservas.forEach((reserva) => {
        const fechaConvertida = convertirFormatoFecha(reserva.fecha);
        const reservaElemento = document.createElement('li');
        reservaElemento.textContent = `Nombre: ${reserva.nombre}, Teléfono: ${reserva.telefono}, Fecha: ${fechaConvertida}, Hora: ${reserva.hora}`;



        userReservations.appendChild(reservaElemento);
    });
}



// Función para calcular el tiempo restante para una reserva
function calcularTiempoRestante(fechaReserva, horaReserva) {
    const fechaCompleta = new Date(`${fechaReserva}T${horaReserva}`);
    const ahora = new Date();

    const diferencia = fechaCompleta - ahora;
    if (diferencia <= 0) {
        return 'Tiempo Expirado';
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    return `${dias} días, ${horas} horas, ${minutos} minutos restantes`;
}

// Función para mostrar las reservas junto con el tiempo restante
function mostrarReservasConTiempoRestante() {
    const reservas = obtenerReservas();
    const userReservations = document.getElementById('userReservations');

    if (!userReservations) {
        console.error("El elemento con id 'userReservations' no existe en el DOM.");
        return;
    }

    userReservations.innerHTML = ''; // Limpiar la lista antes de mostrar las reservas

    reservas.forEach((reserva, index) => {
        const fechaConvertida = convertirFormatoFecha(reserva.fecha);
        const tiempoRestante = calcularTiempoRestante(reserva.fecha, reserva.hora);

        const reservaElemento = document.createElement('li');
        reservaElemento.textContent = `Nombre: ${reserva.nombre}, Teléfono: ${reserva.telefono}, Fecha: ${fechaConvertida}, Hora: ${reserva.hora}, Tiempo Restante: ${tiempoRestante}`;

        userReservations.appendChild(reservaElemento);
    });
}

// Función para eliminar una reserva
function eliminarReserva(id) {
    fetch(`https://roughly-picked-humpback.ngrok-free.app/reservas/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la reserva');
        }
        return response.text(); // Puede cambiarse por response.json() si el backend devuelve JSON
    })
    .then(data => {
        console.log(data); // Mensaje del servidor
        obtenerReservasServidor(); // Actualizar la lista de reservas después de eliminar una
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Función para eliminar reservas que ya expiraron (más de 24 horas)
function eliminarReservasExpiradas() {
    const sql = 'DELETE FROM reservas WHERE fecha < NOW() - INTERVAL 1 DAY';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al eliminar reservas expiradas:', err);
            return;
        }
        console.log('Reservas expiradas eliminadas:', result.affectedRows);
    });
}

// Programar eliminación automática cada 24 horas
setInterval(() => {
    eliminarReservasExpiradas();
}, 86400000); // 24 horas en milisegundos


document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim(); // Usar trim para eliminar espacios en blanco
    const fecha = document.getElementById('date').value; 
    const hora = document.getElementById('time').value;

    let mensajeError = ''; // Inicializa el mensaje de error

    // Verificar campos obligatorios
    if (!nombre) {
        mensajeError += 'El nombre es obligatorio. ';
    }
    if (!fecha) {
        mensajeError += 'La fecha es obligatoria. ';
    }
    if (!hora) {
        mensajeError += 'La hora es obligatoria. ';
    }


    // Si hay mensaje de error, muéstralo y detén la ejecución
    if (mensajeError) {
        document.getElementById('message').textContent = mensajeError;
        document.getElementById('message').style.color = "red";
        return;
    }

    // Envío de los datos al servidor
    fetch('https://roughly-picked-humpback.ngrok-free.app/reservas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, telefono: telefono || '', fecha, hora }),  // El teléfono se envía como cadena vacía si no se ingresó
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.mensaje || 'Error al crear la reserva');
            });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('message').textContent = data.mensaje;
        document.getElementById('message').style.color = "green";
        mostrarReservas(); // Actualiza la lista de reservas después de crear una nueva
    })
    .catch(error => {
        document.getElementById('message').textContent = error.message;
        document.getElementById('message').style.color = "red";
    });
});

function obtenerReservasConPolling() {
    setInterval(() => {
        fetch('https://roughly-picked-humpback.ngrok-free.app/reservas')
            .then(response => response.json())
            .then(data => {
                mostrarReservasServidor(data); // Actualizar la lista de reservas en el DOM
            })
            .catch(error => {
                console.error('Error al obtener las reservas:', error);
            });
    }, 3000); // Consulta cada 5 segundos (puedes ajustar el tiempo)
}

// Función para convertir una fecha de "YYYY-MM-DD" o formato ISO a "DD-MM-YYYY"
function convertirFormatoFecha(fecha) {
    // Si la fecha viene en formato ISO (por ejemplo: "2024-09-28T06:00:00.000Z")
    if (fecha.includes('T')) {
        fecha = fecha.split('T')[0]; // Separar solo la parte de la fecha "YYYY-MM-DD"
    }

    // Ahora trabajamos con la fecha en formato "YYYY-MM-DD"
    const partes = fecha.split("-");

    // Verificar que el formato tenga las 3 partes (Año, Mes, Día)
    if (partes.length !== 3) {
        console.error("Formato de fecha inválido:", fecha);
        return fecha; // Retornar la fecha original si hay un error
    }

    // Convertir a formato "DD-MM-YYYY"
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
}


// Función para calcular la diferencia en horas, minutos y segundos
function calculateTimeRemaining() {
    const now = new Date();
    
    // Configurar la próxima eliminación de reservas (a medianoche)
    const nextRemoval = new Date();
    nextRemoval.setHours(24, 0, 0, 0);  // Configura las 00:00 del siguiente día

    // Diferencia entre la hora actual y la próxima eliminación
    const timeDifference = nextRemoval - now;

    // Si la diferencia es negativa, significa que es el próximo día
    if (timeDifference < 0) {
        nextRemoval.setDate(nextRemoval.getDate() + 1);  // Aumentar al día siguiente
    }

    // Calcular horas, minutos y segundos restantes
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
}

// Función para mostrar la cuenta regresiva en el DOM
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    const { hours, minutes, seconds } = calculateTimeRemaining();

    countdownElement.textContent = `Tiempo restante para eliminar todas las reservas: ${hours}h ${minutes}m ${seconds}s`;

    // Actualizar cada segundo
    setTimeout(updateCountdown, 1000);
}

// Iniciar la cuenta regresiva
updateCountdown();


// Mostrar reservas del usuario al cargar la página
window.onload = function() {
    obtenerReservasConPolling(); // Polling de las reservas
    obtenerReservasServidor(); // Ahora se obtienen las reservas del servidor
    enviarUltimaReservaAutomatica(); // Enviar el último mensaje de reserva automáticamente
    mostrarReservasConTiempoRestante(); // Mostrar reservas con tiempo restante
    eliminarReservasExpiradas(); // Verificar y eliminar reservas expiradas al cargar la página
};

