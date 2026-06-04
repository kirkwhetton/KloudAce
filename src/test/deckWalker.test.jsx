import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import ImageMCQ from '../cards/ImageMCQ'
import Hotspot from '../cards/Hotspot'

// Serialised React element — exactly what Supabase returns for AZ-104-028.
// The $$typeof Symbol is lost when JSX is stored as JSON, making it a plain
// object that React 19 refuses to render as a child without reconstruction.
const serialisedSvg = {
  key: null,
  type: 'svg',
  props: {
    viewBox: '0 0 540 300',
    xmlns: 'http://www.w3.org/2000/svg',
    style: { width: '100%' },
    children: [
      { key: null, type: 'rect', props: { x: '10', y: '10', width: '100', height: '100', fill: '#eee' }, _owner: null, _store: {} },
      { key: null, type: 'text', props: { x: '60', y: '60', children: 'Zone 1' }, _owner: null, _store: {} },
    ],
  },
  _owner: null,
  _store: {},
}

const sharedProps = {
  onKnow: vi.fn(),
  onAnswer: vi.fn(),
  onExamAnswer: vi.fn(),
  examMode: false,
  hideAnswers: false,
}

// ── ImageMCQ ──────────────────────────────────────────────────────────────────

const imageMcqBase = {
  id: 'AZ-104-028',
  exam: 'AZ-104',
  category: 'Storage',
  difficulty: 'medium',
  type: 'image-mcq',
  imageAlt: 'Storage redundancy diagram',
  question: 'Which redundancy option does this diagram show?',
  choices: ['GRS', 'ZRS', 'GZRS', 'LRS'],
  correctAnswer: 2,
  answer: 'GZRS',
  explanation: 'Explanation text.',
}

describe('ImageMCQ — diagram variants', () => {
  it('renders with a serialised React-element diagram (AZ-104-028 bug)', () => {
    expect(() =>
      render(<ImageMCQ card={{ ...imageMcqBase, diagram: serialisedSvg }} {...sharedProps} />)
    ).not.toThrow()
  })

  it('renders with an SVG string diagram', () => {
    const svg = '<svg viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100"/></svg>'
    expect(() =>
      render(<ImageMCQ card={{ ...imageMcqBase, diagram: svg }} {...sharedProps} />)
    ).not.toThrow()
  })

  it('renders with a function diagram', () => {
    const diagramFn = () => <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>
    expect(() =>
      render(<ImageMCQ card={{ ...imageMcqBase, diagram: diagramFn }} {...sharedProps} />)
    ).not.toThrow()
  })

  it('renders with no diagram', () => {
    expect(() =>
      render(<ImageMCQ card={{ ...imageMcqBase, diagram: undefined }} {...sharedProps} />)
    ).not.toThrow()
  })
})

// ── Hotspot ───────────────────────────────────────────────────────────────────

const hotspotBase = {
  id: 'AZ-104-HS-001',
  exam: 'AZ-104',
  category: 'Networking',
  difficulty: 'medium',
  type: 'hotspot',
  question: 'Click the correct attachment point for the NSG.',
  imageAlt: 'VNet diagram',
  viewBox: '0 0 680 260',
  zones: [
    { id: 'nic',    label: 'NIC: nic-web-01', x: 65,  y: 130, width: 100, height: 26 },
    { id: 'subnet', label: 'Subnet-web',      x: 30,  y: 55,  width: 300, height: 165 },
  ],
  correctZone: 'subnet',
  answer: 'Associate the NSG with Subnet-web.',
  explanation: 'Subnet-level association applies rules to all VMs automatically.',
}

describe('Hotspot — diagram variants', () => {
  it('renders with a serialised React-element diagram', () => {
    expect(() =>
      render(<Hotspot card={{ ...hotspotBase, diagram: serialisedSvg }} {...sharedProps} />)
    ).not.toThrow()
  })

  it('renders with an SVG string diagram', () => {
    const svg = '<svg viewBox="0 0 680 260"><rect x="0" y="0" width="680" height="260"/></svg>'
    expect(() =>
      render(<Hotspot card={{ ...hotspotBase, diagram: svg }} {...sharedProps} />)
    ).not.toThrow()
  })

  it('renders with a function diagram', () => {
    const diagramFn = () => <svg viewBox="0 0 680 260"><rect x="0" y="0" width="680" height="260" /></svg>
    expect(() =>
      render(<Hotspot card={{ ...hotspotBase, diagram: diagramFn }} {...sharedProps} />)
    ).not.toThrow()
  })
})
