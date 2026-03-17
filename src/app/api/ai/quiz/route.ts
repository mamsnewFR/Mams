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
          content: `Tu es un professeur expert. Génère un quiz QCM à partir du cours suivant.

IMPORTANT : Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après. Format exact :
{
  "questions": [
    {
      "question": "La question ici",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Explication courte de la bonne réponse"
    }
  ]
}

Règles :
- Génère entre 8 et 12 questions selon la richesse du contenu
- Chaque question a exactement 4 options
- correctIndex est l'index (0-3) de la bonne réponse
- Les mauvaises réponses doivent être plausibles
- En français uniquement
- Couvre les points importants du cours
- L'explication doit être concise (1-2 phrases)

Cours :
${content.slice(0, 10000)}`,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid JSON response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    return Response.json(parsed)
  } catch (error) {
    console.error('Quiz API error:', error)
    return Response.json({ error: 'Erreur lors de la génération du quiz' }, { status: 500 })
  }
}
