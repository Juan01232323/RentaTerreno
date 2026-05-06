# Land Rental System 🏡 — Full Stack JavaScript

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

A complete web application for the management of **event land rentals**, allowing users to view the space, check rules, book available dates, make online payments, and contact the owner directly.

The system is built with **Vanilla JavaScript** on the frontend and a backend using **Node.js + Express + MySQL**, integrating real business logic and automation.

---

## 🌐 Project Demo

🔗 https://rentaterreno.netlify.app

---

## 🧠 General Description

The system was designed to solve a real-world case:  
Managing bookings for a high-demand property, avoiding date conflicts, automating payments, and offering multiple contact channels.

Includes:

- Availability validation
- Booking persistence
- Payment integration
- Direct communication with the client
- Automated data cleanup

---

## 🚀 Core Functionalities

### 🖼️ User Experience

- Hero section with CTA (**Book Now**)
- Information sections:
  - Land rules
  - Space features
- Interactive slider gallery
- Dynamic modals for payments and warnings

---

### 📅 Smart Booking System

- Form with validations:
  - Required name
  - Required date and time
  - Optional phone number

- Advanced validations:
  - ❌ Past dates are not allowed
  - ❌ Duplicate bookings for the same date are not allowed

- Real-time booking visualization
- Remaining time calculation for each booking

---

### 💾 Data Persistence

- **LocalStorage**
  - Local booking management
  - Backup in case of server failure

- **Backend (REST API)**
  - Persistent storage in MySQL
  - Automatic synchronization with the frontend

---

### 🔄 Real-Time Update

- Polling every **3 seconds**
- Automatic synchronization with the server
- Immediate reflection of new bookings

---

### 💳 Payment System

Integration with PayPal via dynamic redirection:

- 💵 Deposit: $500 MXN
- 💰 Full Payment: $2500 MXN
- 🔁 Remaining Balance: $2000 MXN

Includes:

- Payment selection modal
- Prior validation (WhatsApp contact recommended)

---

### 📲 WhatsApp Integration

- Floating contact button
- Warning modal before redirection
- Direct communication with the owner

---

### 🔒 Content Protection

- Right-click block
- Print prevention (`Ctrl + P`)
- PrintScreen key detection
- Image drag block

> ⚠️ Note: These measures are preventative at the browser level and do not guarantee absolute security.

---

### 🧹 System Automation

- Automatic removal of expired bookings (>24h)
- Implemented with `node-cron`
- Keeps the database clean and up to date

---

## 🛠️ Tech Stack


| Area | Technology |
|----------------|------------------------------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Backend | Node.js, Express |
| Database | MySQL |
| Persistence | LocalStorage + REST API |
| Payments | PayPal |
| Automation | node-cron |
| Hosting | Netlify (frontend) + ngrok (dev API) |

---

## ⚙️ Architecture

### 🔹 Frontend

- Lightweight SPA with native JavaScript
- DOM manipulation
- Intensive use of events
- Custom modals

### 🔹 Backend (REST API)

Available endpoints:

- `GET /reservas` → Get bookings
- `POST /reservas` → Create booking
- `DELETE /reservas/:id` → Delete booking

---

## 🗄️ Database

Table: `reservas`

```sql
CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  telefono VARCHAR(20),
  fecha DATE,
  hora TIME
);
```

---

## 🔄 Booking Flow

1. User fills out the form
2. Frontend validation
3. Submission via `fetch()` to the backend
4. Server-side validation:
   * Valid date
   * Availability
5. Insertion into MySQL
6. Automatic UI update

---

## 💳 Payment Flow

1. User selects "Book Now"
2. Payment modal is displayed
3. Select payment type
4. Redirection to PayPal with dynamic parameters

---

## ⚠️ Important Considerations

* The server may not be available 24/7 (due to ngrok usage)
* WhatsApp contact fallback exists
* The system uses polling instead of WebSockets
* Database credentials must be protected in production (use `.env`)

---

## 🚀 Installation and Execution

### 1. Clone the repository

```bash
git clone https://github.com
```

---

### 2. Backend

```bash
npm install
node app.js
```

---

### 3. Configure MySQL

```sql
CREATE DATABASE reservas;
```

---

### 4. Run frontend

Open:

```index.html```


---

## 📈 Technical Value of the Project

This project demonstrates:

* Real Full Stack development
* Frontend-backend integration
* State management and persistence
* Business logic validations
* API consumption
* Automation with cron jobs
* User Experience (UX) design




## 👨‍💻 Autor

**Juan Carlos Reynoso Zúñiga**
```bash

Full Stack Developer
```


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
