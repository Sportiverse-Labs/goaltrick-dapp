
# 🌐 Goaltrick Dapp

This repository contains the **fullstack application** for the Sportiverse platform, combining:

-  **Frontend:** React.js  
-  **Backend:** Golang API

Sportiverse is the first blockchain infrastructure dedicated to sports-focused Web3 applications. Goaltrick serves as the showcase dApp of Sportiverse.

---

##  Project Structure

```
goaltrick-dapp/
├── api/         # Golang API
│   ├── go.mod
│   ├── main.go
│   └── go.sum
├── client/       # React.js application
│   └── src/
├── README.md
└── package.json
```

---

##  Getting Started


### 1️⃣ Clone the repository
```bash
git clone https://github.com/sportiverse/goaltrick-dapp.git
cd goaltrick-dapp
```

### 2️⃣ Setup Frontend (React)
```bash
cd frontend
npm install
npm run start
```
Frontend runs at: `http://localhost:1234`

---

### 3️⃣ Setup Backend (Golang)
Open a new terminal:
```bash
cd api
go mod tidy
go run main.go
```
Backend API runs at: `http://localhost:5000`

---

### 🚨 Alert

> ⚠️ **Attention: To run the DApp properly, follow the steps below in the given order:**
>
> 1. Start the **frontend** with the command:
>    ```bash
>    npm run dev
>    ```
> 2. Then, run the **backend** with:
>    ```bash
>    go run main.go
>    ```
> 3. Download the **blockchain** from the repository:
>    [https://github.com/Sportiverse-Labs/sportiverse-testnet](https://github.com/Sportiverse-Labs/sportiverse-testnet)
> 
> 4. Place the downloaded blockchain folder **in the same directory** as the main project folder.
>
> 5. Start the **blockchain** with the command:
>    ```bash
>    sportiversed start
>    ```
>
> ✅ This way, the **frontend**, **backend**, and **blockchain** will be properly connected, and the DApp will run smoothly.

##  Available Scripts

| Location   | Command         | Description              |
|------------|-----------------|--------------------------|
| `/`| `npm run dev` | Run React dev server     |
| `/api` | `go run main.go`   | Run Go API |

---

##  Design & UX

Crafted focusing on clean design, responsiveness, and a user-friendly interface for both devs and non-technical users.

---

##  Contributing

We welcome contributions!  


---

##  Team

- [**Daniel Augusto**](https://github.com/odanielaugusto) — Business Analyst
- [**Pedro Jorge**](https://github.com/PedroJorgeSA) — UI/UX Designer
- [**Victor Garcia**](https://github.com/CryptoVictor) — Blockchain Engineer
- [**João Pedro**](https://github.com/joaoaraujo2006) — FullStack Developer

---

##  Contact

For questions, partnerships or contributions, reach us at: [sportiverselabs@gmail.com](mailto:sportiverselabs@gmail.com)

