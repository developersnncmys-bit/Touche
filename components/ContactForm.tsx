"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
};

const projectTypes = [
  "Residential Design",
  "Commercial Interiors",
  "Turnkey Execution",
  "Space Planning",
  "Modular Furniture",
  "Consultation",
];

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("sent");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
      <Field label="Name" name="name" value={form.name} onChange={onChange} required />
      <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
      <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={onChange} />
      <SelectField
        label="Project Type"
        name="projectType"
        value={form.projectType}
        onChange={onChange}
        options={projectTypes}
        required
      />
      <Field
        label="Project Location"
        name="location"
        value={form.location}
        onChange={onChange}
        wrapperClassName="md:col-span-2"
      />
      <div className="md:col-span-2">
        <label className="eyebrow text-ink/50 mb-3 block">Project Brief</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={5}
          required
          className="w-full border-b border-ink/30 focus:border-champagne pb-3 text-base resize-none transition-colors duration-500"
          placeholder="Tell us about your space, ambition and timeline…"
        />
      </div>

      <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4">
        <p className="text-xs text-ink/50 max-w-md">
          By submitting this form you agree to be contacted by the Touché
          studio. We respond within two working days.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-8 py-4 bg-ink text-ivory text-[11px] tracking-luxe uppercase hover:bg-champagne transition-colors duration-500 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send Enquiry →"}
        </button>
      </div>

      {status === "sent" && (
        <p className="md:col-span-2 text-sm text-champagne">
          Thank you. Your enquiry has reached the studio. We&apos;ll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p className="md:col-span-2 text-sm text-red-600">
          {error ?? "Sorry — something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  wrapperClassName,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  wrapperClassName?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <label className="eyebrow text-ink/50 mb-3 block">{label}{required && " *"}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-ink/30 focus:border-champagne pb-3 text-base transition-colors duration-500"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow text-ink/50 mb-3 block">{label}{required && " *"}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-ink/30 focus:border-champagne pb-3 text-base bg-transparent appearance-none transition-colors duration-500"
      >
        <option value="">Select a service…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
