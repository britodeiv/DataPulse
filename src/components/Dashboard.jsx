import React from 'react'
import { motion } from 'framer-motion'
import KpiCard from './KpiCard'
import LineChartPanel from './LineChartPanel'
import BarChartPanel from './BarChartPanel'
import useSimulatedApi from '../hooks/useSimulatedApi'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function Dashboard() {
  const { dataPoints, kpis } = useSimulatedApi()

  return (
    <motion.section initial="hidden" animate="show" variants={container} className="space-y-6">
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="CPU" value={`${kpis.cpu.toFixed(1)}%`} delta={kpis.cpuDelta} icon="⚙️" color="from-emerald-400 to-teal-400" />
        <KpiCard title="Rede" value={`${kpis.net.toFixed(1)} Mbps`} delta={kpis.netDelta} icon="📡" color="from-sky-400 to-indigo-400" />
        <KpiCard title="Temperatura" value={`${kpis.temp.toFixed(1)} °C`} delta={kpis.tempDelta} icon="🌡️" color="from-amber-400 to-red-400" />
        <KpiCard title="Usuários" value={kpis.users} delta={kpis.usersDelta} icon="👥" color="from-cyan-400 to-blue-400" />
      </motion.div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-4 rounded-xl glow-accent">
          <LineChartPanel data={dataPoints} />
        </div>
        <div className="card p-4 rounded-xl">
          <BarChartPanel data={dataPoints} />
        </div>
      </motion.div>
    </motion.section>
  )
}