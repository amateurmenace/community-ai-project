import * as React from 'react'
import { Terminal } from 'civic-ui'

/** An interactive CLI session with a blinking cursor. */
export const CLI = () => (
  <div style={{ maxWidth: 520 }}>
    <Terminal title="civic-cli" cursor>
      <div><span className="cui-terminal__prompt">$</span> civic deploy commit</div>
      <div>Building constitutional model…</div>
      <div>✓ Deployed to neighborhood-ai.netlify.app</div>
      <div><span className="cui-terminal__prompt">$</span> </div>
    </Terminal>
  </div>
)

/** A plain log surface — no dots, just output. */
export const Log = () => (
  <div style={{ maxWidth: 520 }}>
    <Terminal title="deploy.log" dots={false}>
      <div>[12:04] fetching agenda PDFs… 14 found</div>
      <div>[12:04] parsing with OCR + LLM…</div>
      <div>[12:05] wrote structured/agenda-2026-06.json</div>
    </Terminal>
  </div>
)
