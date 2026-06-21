import * as React from 'react'
import { ProjectCard, Badge, Button } from 'civic-ui'

const BotIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6V2H8" /><rect width="16" height="12" x="4" y="6" rx="2" />
    <path d="M2 12h2M20 12h2M15 13v2M9 13v2" />
  </svg>
)
const ModelIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3 3 3 3 0 0 0 6 0 3 3 0 0 0 3-3 3 3 0 0 0 0-6 3 3 0 0 0-3-3 3 3 0 0 0-3-3Z" />
    <path d="M12 8v8M8 12h8" />
  </svg>
)
const CaptionIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="14" x="3" y="5" rx="2" /><path d="M7 15h4M15 15h2M7 11h2M13 11h4" />
  </svg>
)

/** The featured project — icon, status badge, tech tags, full-width launch. */
export const Featured = () => (
  <div style={{ maxWidth: 360 }}>
    <ProjectCard
      icon={BotIcon}
      title="Commit: a localized AI agent for cities + towns"
      description="An experimental agentic AI chatbot and get-things-done tool that helps you take real-world actions in your community."
      badges={<Badge tone="lime">Beta</Badge>}
      tags={['AI Agent', 'Local LLM', 'Vibe Coding']}
      action={<Button variant="primary" block>Launch app</Button>}
    />
  </div>
)

/** Multiple status badges and a longer tech stack. */
export const MultipleBadges = () => (
  <div style={{ maxWidth: 360 }}>
    <ProjectCard
      icon={ModelIcon}
      title="Neighborhood AI"
      description="Fine-tune and launch constitutional local AI models that belong to the communities they serve."
      badges={<><Badge tone="lime" dot>New</Badge><Badge tone="purple">Local LLM</Badge></>}
      tags={['RAG', 'LLM', 'Vector DB', 'Ollama']}
      action={<Button variant="primary" block>Launch app</Button>}
    />
  </div>
)

/** An accessibility tool, secondary action style. */
export const Tool = () => (
  <div style={{ maxWidth: 360 }}>
    <ProjectCard
      icon={CaptionIcon}
      title="Community Captioner"
      description="Free browser-based real-time open captions for OBS live streams — no expensive hardware required."
      badges={<Badge tone="sky">Web Tool</Badge>}
      tags={['Whisper', 'WebSpeech API', 'OBS']}
      action={<Button variant="secondary" block>Open tool</Button>}
    />
  </div>
)
