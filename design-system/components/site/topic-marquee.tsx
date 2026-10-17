/** Bandeau défilant des thématiques (décoratif) : bords fondus, séparateurs ✦, pause au survol. */
export function TopicMarquee({ topics }: { topics: string[] }) {
  return (
    <div aria-hidden className="vd-marquee-track border-y border-border bg-background-alt py-[22px]">
      <div className="vd-marquee text-lg font-semibold tracking-[-.01em] text-foreground-ghost">
        {[...topics, ...topics].map((topic, i) => (
          <span key={i}>{topic}</span>
        ))}
      </div>
    </div>
  );
}
