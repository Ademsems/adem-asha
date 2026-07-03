"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { site } from "@/content/site";

type FieldErrors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: {
  name: string;
  email: string;
  message: string;
  consent: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 100) errors.name = "Name is too long.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  else if (values.message.trim().length > 5000) errors.message = "Message is too long.";
  if (!values.consent)
    errors.consent = "Please agree to the privacy note before sending.";
  return errors;
}

export function ContactForm() {
  const { toast } = useToast();
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [sending, setSending] = React.useState(false);
  const [sendFailed, setSendFailed] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
    };

    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSending(true);
    setSendFailed(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));

      if (res.ok) {
        toast({
          variant: "success",
          title: "Message sent",
          description: "Thanks for reaching out — I'll get back to you soon.",
        });
        form.reset();
      } else if (res.status === 400 && body?.errors) {
        setErrors(body.errors as FieldErrors);
      } else {
        setSendFailed(true);
      }
    } catch {
      setSendFailed(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block font-mono text-sm text-heading">
          Name
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" className="mt-2 text-sm text-red-400">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-mono text-sm text-heading">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="mt-2 text-sm text-red-400">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-sm text-heading">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="What can I help you with?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-aqua"
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree that the data I submit is used only to respond to my
            enquiry (GDPR).
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-2 text-sm text-red-400">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="solid" disabled={sending} className="w-full sm:w-auto">
        {sending ? "Sending…" : "Send message"}
      </Button>

      {sendFailed ? (
        <p role="alert" className="rounded-md border border-red-400/50 bg-red-400/10 p-4 text-sm">
          Sorry — the message couldn&apos;t be sent right now. Please email me
          directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-aqua transition-opacity hover:opacity-80"
          >
            {site.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
