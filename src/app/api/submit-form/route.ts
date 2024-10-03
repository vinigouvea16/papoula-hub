import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

Airtable.configure({
  apiKey: process.env.AIRTABLE_PAT,
})
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!)

export async function POST(request: NextRequest) {
  try {
    const { records } = await request.json()

    if (!process.env.AIRTABLE_PAT || !process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { message: 'Missing environment variables' },
        { status: 500 },
      )
    }

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
