// To use a local backend, put VITE_API_URL=http://localhost:3000 in .env.local.
export const API_URL = import.meta.env.VITE_API_URL || 'https://spherical-festivity-shock.ngrok-free.dev';

// http -> ws, https -> wss: browsers block ws:// on an https page.
export const SOCKET_URL = `${API_URL.replace(/^http/, 'ws')}/multiplayer`;
