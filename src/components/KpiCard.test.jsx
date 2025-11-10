import React from 'react'
import { render, screen } from '@testing-library/react'
import KpiCard from './KpiCard'

describe('KpiCard', () => {
  it('renderiza título, valor e delta corretamente', () => {
    render(<KpiCard title="CPU" value="42.0%" delta={5.3} icon="⚙️" />)

    expect(screen.getByText(/CPU/i)).toBeInTheDocument()
    expect(screen.getByText(/42.0%/i)).toBeInTheDocument()
    expect(screen.getByText(/5.3%/i)).toBeInTheDocument()
  })
})