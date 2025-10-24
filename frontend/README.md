
# Chat-GPT Clone - Frontend

This is a React + Vite frontend for the Chat-GPT clone.

Quick start

1. Install dependencies

```powershell
cd "d:\\NODE BACKEND\\Day23 (ChatGPT)\\frontend"
npm install
```

2. Start dev server

```powershell
npm run dev
```

What I added

- Redux Toolkit store at `src/store` (messages slice)
- Socket service at `src/services/socket.js` using `socket.io-client`
- Components: `Navbar`, `Footer`, `ChatWindow`, `MessageBubble`, `InputBar`
- Pages: `Home`, `CreateChat`
- API wrapper at `src/api/chat.api.jsx` (for REST endpoints)

Backend expectations

- Socket server at `https://chatgpt-clone-ped1.onrender.com` accepting socket.io connections.
- Socket event `message` used to send/receive messages. Messages should be objects: `{ role: 'user'|'assistant', content: string }`.
- Optional REST endpoints `/chats` and `/chats/:id/messages` for chat listing and messages.

Next steps

- Implement chat list and chat selection
- Persist chats via REST API
- Add authentication flows
- Improve styling and animations
