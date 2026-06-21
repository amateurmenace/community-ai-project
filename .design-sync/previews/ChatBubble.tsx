import * as React from 'react'
import { ChatBubble } from 'civic-ui'

/** A short civic-assistant exchange. */
export const Conversation = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 460 }}>
    <ChatBubble from="ai">Hi! I can help you take action in your town. What do you need?</ChatBubble>
    <ChatBubble from="user">When is the next city council meeting?</ChatBubble>
    <ChatBubble from="ai">The next council meeting is Tuesday at 6:00 PM at City Hall. Want me to add it to your calendar?</ChatBubble>
  </div>
)

/** The two roles. */
export const Roles = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 460 }}>
    <ChatBubble from="ai">Assistant message</ChatBubble>
    <ChatBubble from="user">Resident message</ChatBubble>
  </div>
)
