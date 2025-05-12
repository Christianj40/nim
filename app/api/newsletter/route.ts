import { NextResponse } from 'next/server'
import * as Brevo from '@getbrevo/brevo'

// Initialize the API client
const apiInstance = new Brevo.ContactsApi()
apiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Create a new contact
    const createContact = new Brevo.CreateContact()
    createContact.email = email
    // Replace 2 with your actual list ID from Brevo
    createContact.listIds = [2]

    // Add the contact to the list
    await apiInstance.createContact(createContact)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
} 