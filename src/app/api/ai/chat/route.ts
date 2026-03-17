import { anthropic, MODEL } from '@/lib/anthropic'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { messages, courseContent } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Messages requis' }, { status: 400 })
    }

    const systemPrompt = courseContent
      ? `Tu es Leo AI, un assistant pédagogique intelligent et bienveillant. Tu aides les étudiants à comprendre leur cours.

Tu as accès au cours suivant de l'étudiant :
---
${courseContent.slice(0, 8000)}
---

Instructions :
- Réponds UNIQUEMENT en français
- Base tes réponses sur le contenu du cours fourni
- Si la question n'est pas liée au cours, dis-le gentiment et recentre sur le cours
- Sois pédagogue, clair et encourageant
- Utilise des exemples concrets quand c'est utile
- Si tu ne sais pas quelque chose, dis-le honnêtement`
      : `Tu es Leo AI, un assistant pédagogique intelligent. Réponds en français de manière claire et pédagogique.`

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text))
          }
        }
        controller.close()
      },
    })

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json({ error: 'Erreur lors de la réponse' }, { status: 500 })
  }
}
