/*
  How the contact form delivers messages. Nothing here pretends to send:

  1. A form service is set (site.contactFormEndpoint): the message is POSTed
     there as form data and the service emails it to you. Formspree works out
     of the box (see README.md); other services may need small changes below.
  2. Only your email is set (site.email): the visitor's own email app opens
     with the message filled in, and they press Send there.
  3. Neither is set: the form explains that it isn't connected yet.
*/
import { site } from '../config/site'

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactField = keyof ContactMessage
export type ContactErrors = Partial<Record<ContactField, string>>
export type ContactDelivery = 'service' | 'email-app' | 'not-connected'

export const MESSAGE_MIN_LENGTH = 10
export const MESSAGE_MAX_LENGTH = 2000

// Deliberately simple: something@something.something, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function getDelivery(): ContactDelivery {
  if (site.contactFormEndpoint) return 'service'
  if (site.email) return 'email-app'
  return 'not-connected'
}

/** Returns an error message for each field that needs fixing. */
export function validateContact(values: ContactMessage): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Enter your name.'
  else if (name.length < 2) errors.name = 'Enter your full name.'

  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter an email address like name@example.com.'
  }

  if (!subject) errors.subject = 'Add a subject.'

  if (!message) errors.message = 'Write a message.'
  else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Add a little more detail (at least ${MESSAGE_MIN_LENGTH} characters).`
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Keep it under ${MESSAGE_MAX_LENGTH} characters.`
  }

  return errors
}

function trimmed(values: ContactMessage): ContactMessage {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  }
}

/** Sends the message to the form service. Throws if it wasn't accepted. */
export async function sendToService(endpoint: string, values: ContactMessage) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)
  const body = new FormData()
  for (const [field, value] of Object.entries(trimmed(values))) body.append(field, value)
  try {
    // Same request Formspree documents: form data, asking for a JSON reply.
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`The form service answered ${response.status}.`)
  } finally {
    window.clearTimeout(timeout)
  }
}

/** A mailto: link that opens the visitor's email app with everything filled in. */
export function buildMailtoLink(to: string, values: ContactMessage) {
  const { name, email, subject, message } = trimmed(values)
  const body = `${message}\n\n${name}\n${email}`
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
