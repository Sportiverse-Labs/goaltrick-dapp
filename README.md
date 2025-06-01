
# 🌐 Sportiverse Frontend

This repository contains the **fullstack application** for the Sportiverse platform, combining:

-  **Frontend:** React.js  
-  **Backend:** Express.js (Node.js)

Sportiverse is the first blockchain infrastructure dedicated to sports-focused Web3 applications. This app serves as the official web gateway to explore the Sportiverse ecosystem, access documentation, showcase dApps like GoalTrick, and connect with the team.

---

##  Project Structure

```
sportiverse-frontend/
├── backend/          # Express.js server
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/         # React.js application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
└── docker-compose.yml   # (Optional) For combined setup
```

---

##  Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sportiverse/sportiverse-frontend.git
cd sportiverse-frontend
```

### 2️⃣ Setup Frontend (React)
```bash
cd frontend
npm install
npm run start
```
Frontend runs at: `http://localhost:3000`

---

### 3️⃣ Setup Backend (Express)
Open a new terminal:
```bash
cd backend
npm install
npm run dev
```
Backend API runs at: `http://localhost:5000`

---

##  Available Scripts

| Location   | Command         | Description              |
|------------|-----------------|--------------------------|
| `/frontend`| `npm run start` | Run React dev server     |
| `/backend` | `npm run dev`   | Run Express server (nodemon) |

---

##  Deployment

For production, consider using:
- **Docker Compose** to orchestrate frontend & backend
- Hosting solutions like Vercel (frontend) + Render/Heroku (backend)

> Deployment scripts coming soon!

---

##  Design & UX

Crafted focusing on clean design, responsiveness, and a user-friendly interface for both devs and non-technical users.

---

##  Contributing

We welcome contributions!  


---

##  Team

- [**Daniel Augusto**](https://github.com/odanielaugusto) — Product Lead 
- [**Pedro Jorge**](https://github.com/PedroJorgeSA) — Design & Frontend
- [**Victor Garcia**](https://github.com/CryptoVictor) — Smart Contract Engineer

---

## 📬 Contact

For inquiries or collaboration opportunities:  
📧 [email@email.com](mailto:email@email.com)

Check out [Sportiverse Blockchain](https://github.com/sportiverse/sportiverse-blockchain)

