import { NextRequest, NextResponse } from 'next/server'
import Anthropic                    from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT }            from '@/lib/chat/systemPrompt'
import { rateLimit, rateLimitKey }  from '@/lib/utils/rateLimit'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(rateLimitKey(req), { limit: 20, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
  }

  let messages: Message[]
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages) || messages.length === 0) throw new Error()
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  /* Keep last 10 messages to stay within context limits */
  const trimmed = messages.slice(-10).map((m) => ({
    role:    m.role,
    content: String(m.content).slice(0, 2000),
  }))

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = anthropic.messages.stream({
          model:      'claude-haiku-4-5-20251001',
          max_tokens: 512,
          system:     SYSTEM_PROMPT,
          messages:   trimmed,
        })

        for await (const event of messageStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(new TextEncoder().encode(event.delta.text))
          }
        }
      } catch {
        controller.enqueue(new TextEncoder().encode("Désolé, je suis momentanément indisponible. Contacte-nous à contact@icekey.shop."))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type':  'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
