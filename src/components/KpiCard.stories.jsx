import React from 'react'
import KpiCard from './KpiCard'

export default {
  title: 'Components/KpiCard',
  component: KpiCard,
  args: {
    title: 'CPU',
    value: '35.4%',
    delta: -2.1,
    icon: '⚙️'
  }
}

export const Default = (args) => <div style={{ width: 360 }}><KpiCard {...args} /></div>

export const PositiveDelta = {
  args: {
    title: 'Rede',
    value: '120.5 Mbps',
    delta: 8.9,
    icon: '📡'
  }
}