import { Reveal } from "../ui/reveal";

export interface HowWeTestProps {
  steps: { title: string; text: string }[];
}

/** 4 étapes numérotées 01 → 04 : prouve que les tests sont réels (E-E-A-T). */
export function HowWeTest({ steps }: HowWeTestProps) {
  return (
    <ol className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={(i % 4) * 70} className="rounded-card border border-border bg-panel px-6 py-7">
          <span aria-hidden className="mb-[30px] block text-[40px] font-light leading-none tracking-[-.04em] text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mb-1.5 text-lg font-medium tracking-[-.02em]">{step.title}</h3>
          <p className="text-sm text-foreground-muted">{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
