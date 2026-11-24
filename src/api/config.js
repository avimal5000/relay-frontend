// To use a local backend, put VITE_API_URL=https://relay.storepulse-ai.com in .env.local.
export const API_URL = import.meta.env.VITE_API_URL || 'https://relay.storepulse-ai.com';

// http -> ws, https -> wss: browsers block ws:// on an https page.
export const SOCKET_URL = `${API_URL.replace(/^http/, 'ws')}/multiplayer`;
