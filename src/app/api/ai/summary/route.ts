import { anthropic, MODEL } from '@/lib/anthropic'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json()

    if (!content || typeof content !== 'string') {
      return Response.json({ error: 'Contenu requis' }, { status: 400 })
    }

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Tu es un assistant pédagogique expert. Crée un résumé clair et structuré du cours suivant en français.

Le résumé doit :
- Commencer par une introduction en 2-3 phrases
- Avoir des sections principales avec des titres en gras (ex: **Titre**)
- Inclure les points clés sous forme de bullet points (•)
- Terminer par une conclusion/synthèse
- Être en français
- Être facile à lire et mémoriser

Cours à résumer :
${content.slice(0, 10000)}`,
        },
      ],
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
    console.error('Summary API error:', error)
    return Response.json({ error: 'Erreur lors de la génération du résumé' }, { status: 500 })
  }
}
