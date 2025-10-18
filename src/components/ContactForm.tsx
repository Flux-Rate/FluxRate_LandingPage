import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { ContactContent } from '../content/siteContent';
import { trackCTA, trackView } from '../utils/analytics';
import {
  ContactFormErrors,
  ContactFormValues,
  isEmailValid,
  isNonEmpty,
} from '../utils/validators';

type ContactFormProps = {
  content: ContactContent;
};

const initialValues: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  facilityType: '',
  message: '',
};

const ContactForm = ({ content }: ContactFormProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (isInView) {
      trackView('contact');
    }
  }, [isInView]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const validate = (formValues: ContactFormValues) => {
    const validationErrors: ContactFormErrors = {};
    if (!isNonEmpty(formValues.name)) {
      validationErrors.name = 'Please include your name.';
    }
    if (!isNonEmpty(formValues.company)) {
      validationErrors.company = 'Please include your company.';
    }
    if (!isEmailValid(formValues.email)) {
      validationErrors.email = 'Please provide a valid email.';
    }
    if (!isNonEmpty(formValues.facilityType)) {
      validationErrors.facilityType = 'Select a facility type.';
    }
    if (!isNonEmpty(formValues.message)) {
      validationErrors.message = 'Share a short description of your needs.';
    }
    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    trackCTA('contact_form_submitted', { facilityType: values.facilityType });
    // Fake network delay for demo purposes.
    await new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });
    console.log('Contact request submitted', values);
    setSubmitting(false);
    setToast('Thanks! We will reach out shortly.');
    setValues(initialValues);
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-title"
      tabIndex={-1}
      className="bg-panel py-20 sm:py-24"
      {...(!shouldReduceMotion
        ? {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
            transition: { duration: 0.6, ease: 'easeOut' },
          }
        : {})}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 lg:px-8">
        <div className="space-y-4">
          <div className="inline-flex rounded-full border border-white/10 bg-bg/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            Contact
          </div>
          <h2 id="contact-title" className="text-3xl font-semibold sm:text-4xl">
            {content.headline}
          </h2>
          <p className="max-w-prose-balanced text-base text-muted">{content.subheadline}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-white/10 bg-bg/70 p-6 shadow-soft backdrop-blur"
        >
          {toast && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent"
            >
              {toast}
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Name"
              id="name"
              type="text"
              value={values.name}
              error={errors.name}
              onChange={(value) => setValues((prev) => ({ ...prev, name: value }))}
              autoComplete="name"
            />
            <Field
              label="Company"
              id="company"
              type="text"
              value={values.company}
              error={errors.company}
              onChange={(value) => setValues((prev) => ({ ...prev, company: value }))}
              autoComplete="organization"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Email"
              id="email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={(value) => setValues((prev) => ({ ...prev, email: value }))}
              autoComplete="email"
            />
            <SelectField
              label="Facility Type"
              id="facilityType"
              value={values.facilityType}
              options={content.facilityTypes}
              error={errors.facilityType}
              onChange={(value) => setValues((prev) => ({ ...prev, facilityType: value }))}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={values.message}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, message: event.target.value }))
              }
              rows={4}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-panel/70 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-2 text-xs text-accent">
                {errors.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted">
              We respond within two business days. Your information stays private.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Sending…' : content.submitCta}
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

type FieldProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  autoComplete?: string;
};

const Field = ({ label, id, type, value, error, onChange, autoComplete }: FieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-ink">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required
      autoComplete={autoComplete}
      className="mt-2 w-full rounded-2xl border border-white/10 bg-panel/70 px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <p id={`${id}-error`} className="mt-2 text-xs text-accent">
        {error}
      </p>
    )}
  </div>
);

type SelectFieldProps = {
  label: string;
  id: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (value: string) => void;
};

const SelectField = ({ label, id, value, options, error, onChange }: SelectFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-ink">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required
      className="mt-2 w-full rounded-2xl border border-white/10 bg-panel/70 px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      <option value="">Select facility type</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && (
      <p id={`${id}-error`} className="mt-2 text-xs text-accent">
        {error}
      </p>
    )}
  </div>
);

export default ContactForm;
