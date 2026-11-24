# Relay

Relay is a word-chain game for the browser. Each word you play must start with the last two letters of the word before it. Keep the chain alive for as long as you can, solo or against other players.

This repository is the React frontend. Login, leaderboards and multiplayer need a separate backend server, described under [Backend](#backend).

## How to play

1. You start with a two-letter fragment, such as `RO`.
2. Type a real word of at least three letters that starts with that fragment, such as `ROBOT`.
3. The last two letters of your word become the next fragment, so `ROBOT` gives you `OT`.
4. Each word scores one point per letter, so longer words earn more.
5. You can't reuse a word in the same run.
6. Your run ends if you play a word that nothing can follow.

## Features

- **Solo mode:** play for a high score and submit it to the top 10 leaderboard.
- **Multiplayer rooms:** create a room for 2 to 4 players, with a generated or custom room code.
- **Room lobby:** browse open rooms, join by code, chat, and ready up.
- **Timed matches:** race the clock with a live scoreboard, then see the final results.
- **Room moderation:** kick or ban players from a room.
- **Passwordless login:** sign in with a one-click link sent by email.
- **On-screen keyboard:** play with the built-in keyboard or a physical one.

## Tech stack

- [React 19](https://react.dev)
- [Vite 8](https://vite.dev)
- ESLint
- [Datamuse API](https://www.datamuse.com/api/) for word validation

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+
- Optional: the Relay backend running locally, if you don't want to use the deployed one

### Install and run

```bash
git clone https://github.com/avimal5000/relay-frontend.git
cd relay-frontend
npm install
npm run dev
```

Vite prints the local URL when it starts, which is usually <http://localhost:5173>.

### Scripts

| Command           | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the dev server, exposed on the local network  |
| `npm run build`   | Build for production into `dist/`                   |
| `npm run preview` | Serve the production build locally                  |
| `npm run lint`    | Run ESLint                                          |

## Configuration

The app uses the deployed backend at `https://relay-backend-z1ua.onrender.com` by default, in both development and production. The address is set in `src/api/config.js`, and the WebSocket URL is derived from it.

To use a local backend instead, create `.env.local` in the project root:

```bash
VITE_API_URL=https://relay.storepulse-ai.com
```

## Deployment

The backend runs on Render's free tier, which sleeps when idle, so the first request after a quiet period can take 50 seconds or more.

To deploy the frontend on Vercel, import this repository and keep the detected Vite settings. Then set `FRONTEND_URL` on the backend to the deployed frontend URL, without a trailing slash, so login links open the right site.

## Backend

The frontend expects these endpoints:

| Method | Path                     | Purpose                                     |
| ------ | ------------------------ | ------------------------------------------- |
| POST   | `/users/login`           | Email a login link                          |
| POST   | `/users/verify`          | Exchange the link's token for an auth token |
| POST   | `/scores/submit`         | Save a finished solo score                  |
| GET    | `/scores/leaderboard`    | Get the top 10 and the player's own rank    |
| GET    | `/scores/personal-best`  | Get the player's best score                 |
| WS     | `/multiplayer`           | Rooms, chat and live matches                |

Authenticated REST requests send `Authorization: Bearer <token>` and `x-user-email` headers. The WebSocket passes `email` and `token` as query parameters.

Login links must open the frontend with `?email=` and `?token=` in the URL, which the app then sends to `/users/verify`.

## Project structure

```text
src/
├── api/
│   ├── dictionaryapi.js       # Word validation through Datamuse
│   ├── multiplayerSocket.js   # WebSocket client helper
│   └── scoresapi.js           # Score and leaderboard requests
├── components/
│   ├── relay-game/            # Solo game, menu, keyboard, leaderboard
│   └── multiplayer/           # Lobby, room, match and results screens
├── App.jsx                    # Login, screen routing, WebSocket handling
└── main.jsx                   # App entry point
```
