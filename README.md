# ChatGPT Clone

A ChatGPT-like conversational AI web application that allows users to create chat sessions, send messages, and receive real-time AI-generated responses.

## 🚀 Tech Stack

* **React** (Frontend UI)
* **Redux Toolkit** (State management)
* **Node.js & Express** (Backend server)
* **MongoDB** (Database)
* **Socket.IO** (Real-time communication)
* **TailwindCSS** (Styling)
* **Pinecone** (Vector Database for embeddings)
* **RAG (Retrieval Augmented Generation)** for enhanced AI responses

## ✨ Features

* User Authentication (Login / Register)
* Create and manage chat sessions
* Real-time message streaming via Socket.IO
* AI response generation using RAG
* Vector similarity search powered by Pinecone
* Stores conversation history per user
* Clean & responsive UI built with TailwindCSS

## 📂 Project Structure (High-Level)

```
project
│
├── client/            # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── store/     # Redux
│   │   └── api/
│   └── ...
│
└── server/            # Backend API
    ├── routes/
    ├── controllers/
    ├── models/
    └── ...
```

## 🧑‍💻 Installation & Setup

### 1️⃣ Clone the Repository

```
$ git clone https://github.com/adityamaurya-git/chatgpt-clone.git
$ cd chatgpt-clone
```

### 2️⃣ Setup Client

```
$ cd client
$ npm install
$ npm start
```

### 3️⃣ Setup Server

```
$ cd server
$ npm install
$ npm run dev
```

## 🔧 Environment Variables 

Create a `.env` file in the `server/` directory:

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
ORIGIN=http://localhost:3000
PINECON_API_KEY=your_Pinecone_api_key
GEMINI_API_KEY=your_api_key
```

## 📖 Usage

* Register/Login
* Create a new chat
* Start messaging your AI assistant

## 👤 Author

**GitHub:** [https://github.com/adityamaurya-git](https://github.com/adityamaurya-git)

## ⭐️ Show Your Support

If you like this project, please give it a star!

```
⭐️ Star this repo → It helps!
```
