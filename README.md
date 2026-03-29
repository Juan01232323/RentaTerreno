## 🏡 Sistema de Renta de Terreno – Full Stack JavaScript

Aplicación web completa para la gestión de **renta de terreno para eventos**, que permite a los usuarios visualizar el espacio, consultar reglas, reservar fechas disponibles, realizar pagos en línea y contactar directamente al propietario.

El sistema está construido con **JavaScript puro (Vanilla JS)** en el frontend y un backend con **Node.js + Express + MySQL**, integrando lógica de negocio real y automatización.

---

## 🌐 Demo del Proyecto

🔗 https://rentaterreno.netlify.app

---

## 🧠 Descripción General

El sistema fue diseñado para resolver un caso real:  
la administración de reservas de un terreno con alta demanda, evitando conflictos de fechas, automatizando pagos y ofreciendo múltiples canales de contacto.

Incluye:

- Validación de disponibilidad  
- Persistencia de reservas  
- Integración de pagos  
- Comunicación directa con el cliente  
- Automatización de limpieza de datos  

---

## 🚀 Funcionalidades Principales

### 🖼️ Experiencia de Usuario

- Hero section con CTA (**Reservar ahora**)  
- Secciones informativas:  
  - Reglas del terreno  
  - Características del espacio  
- Galería interactiva tipo slider  
- Modales dinámicos para pagos y advertencias  

---

### 📅 Sistema de Reservas Inteligente

- Formulario con validaciones:  
  - Nombre obligatorio  
  - Fecha y hora requeridas  
  - Teléfono opcional  

- Validaciones avanzadas:  
  - ❌ No permite fechas pasadas  
  - ❌ No permite reservas duplicadas por fecha  

- Visualización de reservas en tiempo real  
- Cálculo de tiempo restante de cada reserva  

---

### 💾 Persistencia de Datos

- **LocalStorage**  
  - Manejo de reservas locales  
  - Respaldo en caso de fallo del servidor  

- **Backend (API REST)**  
  - Almacenamiento persistente en MySQL  
  - Sincronización automática con frontend  

---

### 🔄 Actualización en Tiempo Real

- Polling cada **3 segundos**  
- Sincronización automática con el servidor  
- Reflejo inmediato de nuevas reservas  

---

### 💳 Sistema de Pagos

Integración con PayPal mediante redirección dinámica:

- 💵 Anticipo: $500 MXN  
- 💰 Pago completo: $2500 MXN  
- 🔁 Pago restante: $2000 MXN  

Incluye:

- Modal de selección de pago  
- Validación previa (contacto recomendado vía WhatsApp)  

---

### 📲 Integración con WhatsApp

- Botón flotante de contacto  
- Modal de advertencia antes de redirección  
- Comunicación directa con el propietario  

---

### 🔒 Protección de Contenido

- Bloqueo de clic derecho  
- Prevención de impresión (`Ctrl + P`)  
- Detección de tecla PrintScreen  
- Bloqueo de arrastre de imágenes  

> ⚠️ Nota: Estas medidas son preventivas a nivel navegador, no garantizan seguridad absoluta.

---

### 🧹 Automatización del Sistema

- Eliminación automática de reservas expiradas (>24h)  
- Implementado con `node-cron`  
- Mantiene la base de datos limpia y actualizada  

---

## 🛠️ Stack Tecnológico

| Área           | Tecnología                           |
|----------------|------------------------------------|
| Frontend       | HTML5, CSS3, JavaScript (ES6+)     |
| Backend        | Node.js, Express                   |
| Base de Datos  | MySQL                              |
| Persistencia   | LocalStorage + API REST            |
| Pagos          | PayPal                             |
| Automatización | node-cron                          |
| Hosting        | Netlify (frontend) + ngrok (API dev) |

---

## ⚙️ Arquitectura

### 🔹 Frontend

- SPA ligera con JavaScript nativo  
- Manipulación del DOM  
- Uso intensivo de eventos  
- Modales personalizados  

### 🔹 Backend (API REST)

Endpoints disponibles:

- `GET /reservas` → Obtener reservas  
- `POST /reservas` → Crear reserva  
- `DELETE /reservas/:id` → Eliminar reserva  

---

## 🗄️ Base de Datos

Tabla: `reservas`

```sql
CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  telefono VARCHAR(20),
  fecha DATE,
  hora TIME
);
````

---

## 🔄 Flujo de Reserva

1. Usuario llena el formulario
2. Validación en frontend
3. Envío mediante `fetch()` al backend
4. Validación en servidor:

   * Fecha válida
   * Disponibilidad
5. Inserción en MySQL
6. Actualización automática en UI

---

## 💳 Flujo de Pago

1. Usuario selecciona "Reservar ahora"
2. Se muestra modal de pago
3. Selecciona tipo de pago
4. Redirección a PayPal con parámetros dinámicos

---

## ⚠️ Consideraciones Importantes

* El servidor puede no estar disponible 24/7 (uso de ngrok)
* Existe fallback a contacto vía WhatsApp
* El sistema usa polling en lugar de WebSockets
* Credenciales de base de datos deben protegerse en producción (usar `.env`)

---

## 🚀 Instalación y Ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-repositorio
```

---

### 2. Backend

```bash
npm install
node app.js
```

---

### 3. Configurar MySQL

```sql
CREATE DATABASE reservas;
```

---

### 4. Ejecutar frontend

Abrir:

```
index.html
```

---

## 📈 Valor Técnico del Proyecto

Este proyecto demuestra:

* Desarrollo Full Stack real
* Integración frontend-backend
* Manejo de estado y persistencia
* Validaciones de negocio
* Consumo de APIs
* Automatización con cron jobs
* Experiencia de usuario (UX)

---

## 👨‍💻 Autor

**Juan Carlos Reynoso Zúñiga**
Full Stack Developer

Enfocado en el desarrollo de soluciones web reales con JavaScript, integración de APIs y sistemas orientados a negocio.

<img width="1919" height="826" alt="image" src="https://github.com/user-attachments/assets/2d91fdf6-f589-4be1-9923-16d97c87167e" />

<img width="1919" height="814" alt="image" src="https://github.com/user-attachments/assets/8b128a96-80fa-4c89-80e6-3e65a3b2391b" />

<img width="1919" height="951" alt="image" src="https://github.com/user-attachments/assets/44af462d-7ba4-4487-a135-a6e64224fdbf" />

<img width="1914" height="942" alt="image" src="https://github.com/user-attachments/assets/5db87fa7-22f8-4517-85db-cb88f9cf2e51" />

<img width="1919" height="936" alt="image" src="https://github.com/user-attachments/assets/3a866c85-4cdf-45d1-8181-7b7853509ba5" />

<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/d8b67671-0d7d-4124-ac6f-82794cc71aa3" />

<img width="1917" height="946" alt="image" src="https://github.com/user-attachments/assets/164de61a-95d4-4772-ad3f-0b90acc68687" />


<img width="1919" height="381" alt="image" src="https://github.com/user-attachments/assets/2bdda87d-f5c4-4758-ac40-ae32343dcef8" />



---

```
```
