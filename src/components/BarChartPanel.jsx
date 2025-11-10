import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { motion } from 'framer-motion'

function formatTimeShort(ts) {
  const d = new Date(ts)
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function BarChartPanel({ data }) {
  const last = data.slice(-6)
  return (
    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="h-72">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Rede (Mbps)</h3>
        <div className="text-sm text-slate-400">Uso atual / histórico</div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={last}>
          <CartesianGrid stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="time" tickFormatter={formatTimeShort} tick={{ fill: 'rgba(203,213,225,0.6)' }} />
          <YAxis tick={{ fill: 'rgba(203,213,225,0.6)' }} />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
          <Bar dataKey="net" fill="rgba(59,130,246,0.9)" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}