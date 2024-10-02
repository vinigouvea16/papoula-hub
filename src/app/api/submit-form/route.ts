import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

// Configure Airtable
Airtable.configure({
  apiKey: process.env.AIRTABLE_PAT,
})
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!)

// Definindo um manipulador para o método POST
export async function POST(request: NextRequest) {
  try {
    const { records } = await request.json()

    // Verifique se as variáveis de ambiente estão disponíveis
    if (!process.env.AIRTABLE_PAT || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { message: 'Missing environment variables' },
        { status: 500 },
      )
    }

    // Criar um registro no Airtable
    await base('Candidatos').create(records)

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json(
      { message: 'Error submitting form' },
      { status: 500 },
    )
  }
}
