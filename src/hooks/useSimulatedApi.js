import { useEffect, useRef, useState } from 'react'

function now() {
  return Date.now()
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v))
}

// Read poll interval from env (Vite exposes VITE_* to client)
const POLL_INTERVAL = Number(import.meta.env.VITE_POLL_INTERVAL ?? 5000)

/*
  Simulação de API local:
  - Mantém uma série temporal de pontos (cpu, net, temp, users)
  - A cada POLL_INTERVAL gera um novo ponto com pequenas variações
  - Retorna array de pontos e KPIs (último valor + delta relativo)
*/
export default function useSimulatedApi() {
  const [dataPoints, setDataPoints] = useState(() => {
    const initial = []
    const baseTime = now() - 19 * POLL_INTERVAL
    let cpu = 35 + Math.random() * 10
    let net = 120 + Math.random() * 40
    let temp = 48 + Math.random() * 4
    let users = 75 + Math.floor(Math.random() * 20)

    for (let i = 0; i < 20; i++) {
      cpu = clamp(cpu + (Math.random() - 0.5) * 6, 5, 95)
      net = clamp(net + (Math.random() - 0.5) * 30, 5, 1000)
      temp = clamp(temp + (Math.random() - 0.5) * 1.6, 20, 95)
      users = Math.max(0, users + Math.floor((Math.random() - 0.4) * 6))

      initial.push({
        time: baseTime + i * POLL_INTERVAL,
        cpu: Number(cpu.toFixed(2)),
        net: Number(net.toFixed(2)),
        temp: Number(temp.toFixed(2)),
        users
      })
    }
    return initial
  })

  const prevKpis = useRef({
    cpu: dataPoints[dataPoints.length - 2]?.cpu ?? dataPoints[dataPoints.length - 1]?.cpu,
    net: dataPoints[dataPoints.length - 2]?.net ?? dataPoints[dataPoints.length - 1]?.net,
    temp: dataPoints[dataPoints.length - 2]?.temp ?? dataPoints[dataPoints.length - 1]?.temp,
    users: dataPoints[dataPoints.length - 2]?.users ?? dataPoints[dataPoints.length - 1]?.users
  })

  const [kpis, setKpis] = useState(() => {
    const last = dataPoints[dataPoints.length - 1]
    return {
      cpu: last.cpu,
      net: last.net,
      temp: last.temp,
      users: last.users,
      cpuDelta: 0,
      netDelta: 0,
      tempDelta: 0,
      usersDelta: 0
    }
  })

  useEffect(() => {
    const id = setInterval(() => {
      setDataPoints(prev => {
        const last = prev[prev.length - 1]
        let cpu = clamp(last.cpu + (Math.random() - 0.45) * 8, 2, 98)
        let net = clamp(last.net + (Math.random() - 0.5) * 60, 0, 2000)
        let temp = clamp(last.temp + (Math.random() - 0.5) * 2, 15, 100)
        let users = Math.max(0, last.users + Math.floor((Math.random() - 0.45) * 8))

        const next = {
          time: now(),
          cpu: Number(cpu.toFixed(2)),
          net: Number(net.toFixed(2)),
          temp: Number(temp.toFixed(2)),
          users
        }

        const nextArr = [...prev.slice(-59), next] // keep up to 60 points

        setKpis(prevKpi => {
          const cpuDelta = prevKpi.cpu ? ((next.cpu - prevKpi.cpu) / (prevKpi.cpu || 1)) * 100 : 0
          const netDelta = prevKpi.net ? ((next.net - prevKpi.net) / (prevKpi.net || 1)) * 100 : 0
          const tempDelta = prevKpi.temp ? ((next.temp - prevKpi.temp) / (prevKpi.temp || 1)) * 100 : 0
          const usersDelta = prevKpi.users ? ((next.users - prevKpi.users) / (prevKpi.users || 1)) * 100 : 0

          prevKpis.current = { cpu: next.cpu, net: next.net, temp: next.temp, users: next.users }

          return {
            cpu: next.cpu,
            net: next.net,
            temp: next.temp,
            users: next.users,
            cpuDelta,
            netDelta,
            tempDelta,
            usersDelta
          }
        })

        return nextArr
      })
    }, POLL_INTERVAL)

    return () => clearInterval(id)
  }, [])

  return { dataPoints, kpis }
}