/** Bandeau défilant des thématiques, sous le hero. */
export function TopicMarquee({ topics }: { topics: string[] }) {
  return (
    <div className="overflow-hidden border-y border-border bg-background-alt py-[22px]">
      <p className="sr-only">{topics.join(", ")}</p>
      <div aria-hidden className="vd-marquee text-lg font-semibold tracking-tight text-foreground-ghost">
        {[...topics, ...topics].map((topic, i) => (
          <span key={i}>{topic}</span>
        ))}
      </div>
    </div>
  );
}
