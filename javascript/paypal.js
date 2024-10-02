// Mostrar el modal
document.getElementById("reservarBtn").onclick = function() {
    const modal = document.getElementById("paymentModal");
    modal.style.display = "block";
    modal.classList.remove('hide');
};
  // Cerrar el modal
document.getElementsByClassName("close")[0].onclick = function() {
    const modal = document.getElementById("paymentModal");
    modal.classList.add('hide');
    setTimeout(() => modal.style.display = 'none', 300); // Añadir un retraso para la transición
};


    // Opción de pagar anticipo
    document.getElementById("payAnticipo").onclick = function() {
        const anticipo = 750;
        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=minimundochez760@gmail.com&item_name=Anticipo%20Reserva%20Terreno&amount=${anticipo.toFixed(2)}&currency_code=MXN`;
        window.location.href = paypalUrl;
    };

    // Opción de pagar el monto completo
    document.getElementById("payCompleto").onclick = function() {
        const montoCompleto = 2500;
        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=minimundochez760@gmail.com&item_name=Reserva%20Completa%20Terreno&amount=${montoCompleto.toFixed(2)}&currency_code=MXN`;
        window.location.href = paypalUrl;
    };

    // Opción de pagar el saldo restante después del anticipo
    document.getElementById("alreadyPaid").onclick = function() {
        const restante = 2500 - 750;
        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=minimundochez760@gmail.com&item_name=Saldo%20Restante%20Reserva%20Terreno&amount=${restante.toFixed(2)}&currency_code=MXN`;
        window.location.href = paypalUrl;
    };

   // Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById("paymentModal");
    if (event.target == modal) {
        modal.classList.add('hide');
        setTimeout(() => modal.style.display = 'none', 300);
    }
};