import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { motion } from 'framer-motion'

function formatTime(ts) {
  const d = new Date(ts)
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

export default function LineChartPanel({ data }) {
  return (
    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="h-72">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">CPU (Últimos pontos)</h3>
        <div className="text-sm text-slate-400">Atualiza conforme intervalo</div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="time" tickFormatter={formatTime} tick={{ fill: 'rgba(203,213,225,0.6)' }} />
          <YAxis tick={{ fill: 'rgba(203,213,225,0.6)' }} domain={[0, 100]} />
          <Tooltip labelFormatter={(label) => formatTime(label)} />
          <Line type="monotone" dataKey="cpu" stroke="#2dd4bf" dot={false} strokeWidth={2} fill="url(#cpuGradient)" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}