import { anthropic, MODEL } from '@/lib/anthropic'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json()

    if (!content || typeof content !== 'string') {
      return Response.json({ error: 'Contenu requis' }, { status: 400 })
    }

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Tu es un expert en mémorisation et en pédagogie. Génère des flashcards à partir du cours suivant.

IMPORTANT : Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après. Format exact :
{
  "flashcards": [
    {
      "question": "Question claire et précise",
      "answer": "Réponse concise et complète"
    }
  ]
}

Règles :
- Génère entre 10 et 20 flashcards selon la richesse du contenu
- Les questions doivent couvrir les concepts clés
- Les réponses doivent être concises (1-3 phrases)
- En français uniquement
- Varier les types de questions (définitions, exemples, comparaisons)

Cours :
${content.slice(0, 10000)}`,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid JSON response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    return Response.json(parsed)
  } catch (error) {
    console.error('Flashcards API error:', error)
    return Response.json({ error: 'Erreur lors de la génération des flashcards' }, { status: 500 })
  }
}
