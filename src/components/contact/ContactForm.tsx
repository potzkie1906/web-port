import {
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import {
  LuCircleAlert,
  LuCircleCheck,
  LuInfo,
  LuLoaderCircle,
  LuMailCheck,
  LuSend,
} from 'react-icons/lu'
import { site } from '../../config/site'
import {
  MESSAGE_MAX_LENGTH,
  buildMailtoLink,
  getDelivery,
  sendToService,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactMessage,
} from '../../lib/contact'
import { Button } from '../ui/Button'
import { CopyButton } from '../ui/CopyButton'
import { Placeholder } from '../ui/Placeholder'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; name: string; email: string }
  | { kind: 'opened' }
  | { kind: 'failed' }
  | { kind: 'not-connected' }

const EMPTY: ContactMessage = { name: '', email: '', subject: '', message: '' }
const FIELD_ORDER: ContactField[] = ['name', 'email', 'subject', 'message']
const delivery = getDelivery()

const fieldId = (field: ContactField) => `contact-${field}`
const errorId = (field: ContactField) => `contact-${field}-error`

/**
 * The contact form. It validates every field, never pretends a message was
 * delivered, and blocks double submissions while a message is sending.
 * How it delivers depends on src/config/site.ts (see src/lib/contact.ts).
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactMessage>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  // After the first submit attempt, fields re-check themselves as you type.
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const sending = status.kind === 'sending'
  // Set synchronously, so even two submits in the same instant send only once.
  const inFlight = useRef(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.currentTarget.name as ContactField
    const next = { ...values, [field]: event.currentTarget.value }
    setValues(next)
    if (attempted || errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateContact(next)[field] }))
    }
    if (status.kind !== 'idle' && !sending) setStatus({ kind: 'idle' })
  }

  // Leaving a field you've typed in checks it, so mistakes show up early.
  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.currentTarget.name as ContactField
    if (!values[field].trim()) return
    setErrors((current) => ({ ...current, [field]: validateContact(values)[field] }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inFlight.current) return

    const found = validateContact(values)
    setErrors(found)
    setAttempted(true)
    const firstInvalid = FIELD_ORDER.find((field) => found[field])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      setStatus({ kind: 'idle' })
      return
    }

    if (delivery === 'service' && site.contactFormEndpoint) {
      inFlight.current = true
      setStatus({ kind: 'sending' })
      try {
        await sendToService(site.contactFormEndpoint, values)
        setStatus({ kind: 'sent', name: values.name.trim(), email: values.email.trim() })
        setValues(EMPTY)
        setAttempted(false)
      } catch {
        setStatus({ kind: 'failed' })
      } finally {
        inFlight.current = false
      }
      return
    }

    if (delivery === 'email-app' && site.email) {
      // Hands the message to the visitor's email app; nothing is sent from here.
      window.location.href = buildMailtoLink(site.email, values)
      setStatus({ kind: 'opened' })
      return
    }

    setStatus({ kind: 'not-connected' })
  }

  const describedBy = (field: ContactField, extra?: string) =>
    [errors[field] ? errorId(field) : null, extra].filter(Boolean).join(' ') || undefined

  const inputProps = (field: ContactField) => ({
    id: fieldId(field),
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: handleBlur,
    required: true,
    'aria-invalid': errors[field] ? true : undefined,
  })

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit} aria-busy={sending}>
      <div className="contact-form__head">
        <h3 className="contact-form__title">Send a message</h3>
        <p className="contact-form__note">All fields are required.</p>
      </div>

      {delivery === 'not-connected' ? (
        <p className="contact-form__setup">
          <Placeholder
            className="placeholder--wrap"
            hint="Set email (or contactFormEndpoint) in src/config/site.ts"
          >
            Not connected yet: add your email in src/config/site.ts to turn this form on
          </Placeholder>
        </p>
      ) : null}

      <div className="contact-form__grid">
        <Field field="name" label="Name" error={errors.name}>
          <input
            {...inputProps('name')}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-describedby={describedBy('name')}
          />
        </Field>

        <Field field="email" label="Email" error={errors.email}>
          <input
            {...inputProps('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="you@example.com"
            aria-describedby={describedBy('email')}
          />
        </Field>

        <Field field="subject" label="Subject" error={errors.subject} wide>
          <input
            {...inputProps('subject')}
            type="text"
            placeholder="What’s it about?"
            aria-describedby={describedBy('subject')}
          />
        </Field>

        <Field
          field="message"
          label="Message"
          error={errors.message}
          wide
          hint={
            <span className="field__count" id="contact-message-count" aria-hidden="true">
              {values.message.length} / {MESSAGE_MAX_LENGTH}
            </span>
          }
        >
          <textarea
            {...inputProps('message')}
            rows={6}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder={`Hi ${site.firstName}, …`}
            aria-describedby={describedBy('message')}
          />
        </Field>
      </div>

      <div className="contact-form__footer">
        <Button
          type="submit"
          className="contact-form__submit"
          disabled={sending}
          icon={
            sending ? (
              <LuLoaderCircle className="spin" aria-hidden="true" />
            ) : (
              <LuSend aria-hidden="true" />
            )
          }
        >
          {sending
            ? 'Sending…'
            : delivery === 'email-app'
              ? 'Continue in email app'
              : 'Send message'}
        </Button>
        {delivery === 'email-app' ? (
          <p className="contact-form__hint">
            This opens your email app with the message filled in. Nothing is sent until
            you press Send there.
          </p>
        ) : null}
      </div>

      <div className="contact-form__status" aria-live="polite">
        <StatusMessage status={status} />
      </div>
    </form>
  )
}

interface FieldProps {
  field: ContactField
  label: string
  error?: string
  hint?: ReactNode
  /** Spans both columns on wider screens. */
  wide?: boolean
  children: ReactNode
}

function Field({ field, label, error, hint, wide = false, children }: FieldProps) {
  return (
    <div
      className="field"
      data-wide={wide || undefined}
      data-invalid={error ? 'true' : undefined}
    >
      <div className="field__top">
        <label className="field__label" htmlFor={fieldId(field)}>
          {label}
        </label>
        {hint}
      </div>
      {children}
      {error ? (
        <p className="field__error" id={errorId(field)}>
          <LuCircleAlert aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

/** "…email me at you@example.com [copy]" — only when an email is set. */
function EmailMe({ lead }: { lead: string }) {
  if (!site.email) return null
  return (
    <>
      {` ${lead} `}
      <a className="text-link" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      .
      <CopyButton text={site.email} label="email address" className="status__copy" />
    </>
  )
}

function StatusMessage({ status }: { status: Status }) {
  switch (status.kind) {
    case 'sent':
      return (
        <p className="status" data-tone="success">
          <LuCircleCheck aria-hidden="true" />
          <span>
            Message sent. Thanks, {status.name}! I’ll reply to {status.email}.
          </span>
        </p>
      )
    case 'opened':
      return (
        <p className="status" data-tone="info">
          <LuMailCheck aria-hidden="true" />
          <span>
            Your email app should now be open with your message. Press Send there to
            deliver it.
            <EmailMe lead="If nothing opened, email me at" />
          </span>
        </p>
      )
    case 'failed':
      return (
        <p className="status" data-tone="error">
          <LuCircleAlert aria-hidden="true" />
          <span>
            Your message wasn’t sent. Check your connection and try again.
            <EmailMe lead="You can also email me at" />
          </span>
        </p>
      )
    case 'not-connected':
      return (
        <p className="status" data-tone="warning">
          <LuInfo aria-hidden="true" />
          <span>
            Not sent: this form isn’t connected to an inbox yet. Your message is still
            here, so nothing is lost.
          </span>
        </p>
      )
    default:
      return null
  }
}
