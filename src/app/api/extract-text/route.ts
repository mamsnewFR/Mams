import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json({ error: 'Fichier requis' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Handle text files
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const text = buffer.toString('utf-8')
      return Response.json({ text })
    }

    // Handle PDF files
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfParseModule = await import('pdf-parse') as any
        const pdfParse = pdfParseModule.default || pdfParseModule
        const data = await pdfParse(buffer)
        return Response.json({ text: data.text })
      } catch {
        return Response.json({ error: 'Impossible de lire le PDF. Essaie de copier-coller le texte.' }, { status: 422 })
      }
    }

    return Response.json({ error: 'Format non supporté. Utilise PDF ou TXT.' }, { status: 415 })
  } catch (error) {
    console.error('Extract text error:', error)
    return Response.json({ error: 'Erreur lors de l\'extraction du texte' }, { status: 500 })
  }
}
