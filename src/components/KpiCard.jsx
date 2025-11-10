import React from 'react'
import { motion } from 'framer-motion'

export default function KpiCard({ title, value, delta, icon, color = 'from-indigo-400 to-purple-400' }) {
  const positive = delta >= 0

  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="card p-4 rounded-xl flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${color} text-black font-bold`}>
        <span>{icon}</span>
      </div>
      <div className="flex-1">
        <div className="text-sm text-slate-400">{title}</div>
        <div className="text-xl font-semibold kpi-value">{value}</div>
      </div>
      <div className="text-right">
        <div className={`text-sm ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {positive ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
        </div>
        <div className="text-xs text-slate-500">últimos intervalo</div>
      </div>
    </motion.div>
  )
}