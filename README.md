# GoalTrick dApp

GoalTrick is the first decentralized social network built for football players, clubs, and professionals — powered entirely by the **Sportiverse blockchain**, a modular L1 for sports ecosystems.

This repository contains the official frontend and lightweight backend implementation of the GoalTrick platform.

> ⚽ Empowering players. 🚀 Enabling talent discovery. 🔐 Fully on-chain.

---

##  Live Deployment

- Visit the ecosystem: [https://www.sportiverse.network/](https://www.sportiverse.network/)

---

##  Tech Stack

| Layer        | Technologies                                      |
|--------------|--------------------------------------------------|
| Frontend     | React, Parcel, React Router, Framer Motion       |
| Backend      | Node.js, Express, SecretJS                       |
| Wallets      | Keplr (Cosmos-compatible wallet integration)     |
| Blockchain   | Sportiverse (Cosmos SDK + CosmWasm chain)        |
| Styling      | Custom CSS                                       |

---

## Features (MVP)

-  Wallet login (Keplr)
-  Profile and feed connected to on-chain data
-  Posts, likes, comments (with blockchain requests)
-  Integration with AI agent for generating smart legal contracts
-  Data integration with Sportiverse chain API

> More features like DeAI identity, transfer NFTs, and tactical simulation are in development — [see our vision here](https://sportiverse.xyz/dapps).

---

##  Getting Started

###  Prerequisites

- Node.js (v16+ recommended)
- Keplr Wallet browser extension
- Git, npm

###  Installation

```bash
git clone https://github.com/sportiverse-labs/goaltrick-dapp.git
cd goaltrick-dapp
npm install
```

###  Development Mode

```bash
npm run dev
```

This will:
- Run the Express backend
- Serve the frontend via Parcel
- Enable auto-refresh using `nodemon`

###  Production Build

```bash
npm run build-client
npm start
```

---

##  Project Structure

```
├── api/                                 
│   ├── go.mod
│   ├── go.sum
│   └── main.go
├── client/                            
│   ├── dist/                
│   └── src/                 
│       ├── components/      
│       │   ├── css/         
│       │   ├── App.js
│       │   ├── Feed.js
│       │   ├── Login.js
│       │   ├── Market.js
│       │   ├── Perfil.js
│       │   ├── Register.js
│       │   └── message.js
│       ├── imgs/              
│       ├── videos/            
│       ├── index.html         
│       └── index.js           
├── contracts/               
├── .gitignore
├── index.js                 
├── package-lock.json
├── package.json
└── README.md


```

---

##  Contributors

| Name           | Role                  |
|----------------|------------------------|
| [Daniel Augusto](#) | Business Analyst       |
| [Pedro Jorge](#)     | UI/UX Designer         |
| [Victor Garcia](#)   | Blockchain Engineer    |
| [João Pedro](#)      | FullStack Developer    |

---

##  Want to Contribute?

We welcome ideas, issues, and pull requests. Please fork this repository, create a feature branch, and open a PR.

Before submitting:
- Ensure your changes are well-documented
- Use consistent styling
- Write clear commit messages

---

## 📜 License

MIT © 2025 — Sportiverse Labs

---

##  Contact

For questions, partnerships or contributions, reach us at: sportiverselabs@gmail.com
📧 

