"use client";

import * as React from "react";
import { FacebookIcon, LinkIcon, LinkedInIcon, XIcon } from "../ui/icons";
import { CopyButton } from "../ui/copy-button";

const round =
  "grid size-[38px] place-items-center rounded-full border border-border text-foreground transition-colors hover:border-border-strong [&_svg]:size-[15px] cursor-pointer [&.is-copied]:border-success [&.is-copied]:text-success";

/** Partage X / Facebook / LinkedIn + copie du lien. `url` = URL canonique de l'article. */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on X", href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: XIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
  ];

  return (
    <div className="not-prose vd-no-print mt-[22px] flex flex-wrap items-center gap-2 text-[13px] text-foreground-muted">
      <span>Share:</span>
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} aria-label={label} target="_blank" rel="noopener" className={round}>
          <Icon />
        </a>
      ))}
      <CopyButton value={url} aria-label="Copy link" copiedLabel={<LinkIcon />} className={round}>
        <LinkIcon />
      </CopyButton>
    </div>
  );
}
