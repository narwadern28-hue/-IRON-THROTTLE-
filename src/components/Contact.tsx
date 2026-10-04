import { useEffect, useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { IconArrow } from "./Icons";

export type ContactPrefill = {
  notes: string;
  base: string;
};

type Props = {
  prefill?: ContactPrefill | null;
};

const bases = ["Street Tracker", "Scrambler", "Café Racer", "Bobber", "Other / not sure"];

export default function Contact({ prefill }: Props) {
  const [sent, setSent] = useState(false);
  const [notes, setNotes] = useState("");
  const [base, setBase] = useState(bases[0]);

  useEffect(() => {
    if (!prefill) return;
    setNotes(prefill.notes);
    const match = bases.find((b) => prefill.base.toLowerCase().includes(b.toLowerCase().split(" ")[0]));
    if (match) setBase(match);
    else if (prefill.base) setBase(prefill.base);
  }, [prefill]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-[11px] tracking-[0.4em] text-copper">ENQUIRY</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-[0.06em] leading-[0.95]">
            START THE CONVERSATION.
          </h2>
          <p className="mt-6 font-serif text-lg text-muted leading-relaxed">
            This form is part of a demonstration website. Submissions are not sent to a workshop, inbox or client.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <p className="font-display tracking-[0.2em] text-[11px] text-warm/40">FICTIONAL CONTACT</p>
            <p>hello@example.com</p>
            <p className="text-muted">United Kingdom / Australia — illustrative only</p>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div className="border border-copper/40 p-8 sm:p-10">
              <p className="font-display tracking-[0.28em] text-copper text-[11px]">DEMO ONLY</p>
              <h3 className="mt-4 font-display text-3xl tracking-[0.08em]">REQUEST RECEIVED — IN THEORY.</h3>
              <p className="mt-4 font-serif text-lg text-muted">
                This is a demonstration form. No request has been sent and no one will contact you.
              </p>
              <button className="btn-ghost mt-8" onClick={() => setSent(false)}>
                RESET FORM
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <label className="block">
                <span className="font-display text-[11px] tracking-[0.22em] text-warm/45">NAME</span>
                <input required className="input-field mt-1" name="name" autoComplete="name" />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="font-display text-[11px] tracking-[0.22em] text-warm/45">EMAIL</span>
                  <input required type="email" className="input-field mt-1" name="email" autoComplete="email" />
                </label>
                <label className="block">
                  <span className="font-display text-[11px] tracking-[0.22em] text-warm/45">PHONE</span>
                  <input className="input-field mt-1" name="phone" autoComplete="tel" />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="font-display text-[11px] tracking-[0.22em] text-warm/45">COUNTRY</span>
                  <select className="input-field mt-1" name="country" defaultValue="UK">
                    <option>UK</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="font-display text-[11px] tracking-[0.22em] text-warm/45">BASE MOTORCYCLE</span>
                  <select className="input-field mt-1" name="base" value={base} onChange={(e) => setBase(e.target.value)}>
                    {bases.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="font-display text-[11px] tracking-[0.22em] text-warm/45">BUDGET RANGE</span>
                <select className="input-field mt-1" name="budget" defaultValue="£20,000–£25,000">
                  <option>£15,000–£20,000</option>
                  <option>£20,000–£25,000</option>
                  <option>£25,000–£35,000</option>
                  <option>£35,000+</option>
                </select>
              </label>
              <label className="block">
                <span className="font-display text-[11px] tracking-[0.22em] text-warm/45">TELL US ABOUT YOUR BUILD</span>
                <textarea
                  className="input-field mt-2"
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Riding style, inspiration, must-haves…"
                />
              </label>
              <button type="submit" className="btn-primary">
                SUBMIT BUILD REQUEST
                <IconArrow className="h-4 w-4" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

