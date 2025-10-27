import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
let socket = null;
export default function App(){
  const [user, setUser] = useState(null);
  useEffect(()=>{ socket = io(BACKEND, { transports: ['websocket'] }); return ()=>{ if(socket) socket.disconnect(); } },[]);
  if(!user) return <Login onLogin={(u)=>setUser(u)} backend={BACKEND} />;
  return <Dashboard user={user} backend={BACKEND} socket={socket} onLogout={()=>setUser(null)} />;
}