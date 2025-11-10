import React from 'react'
import Dashboard from './components/Dashboard'

export default function App() {
  return (
    <div className="min-h-screen p-6 app-bg">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-100">DataPulse</h1>
          <p className="text-slate-400">Painel de Monitoramento em Tempo Real</p>
        </header>
        <Dashboard />
      </div>
    </div>
  )
}