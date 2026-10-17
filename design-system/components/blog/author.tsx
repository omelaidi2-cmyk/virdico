import Image from "next/image";
import { cn } from "../../lib/cn";

export interface AuthorProps {
  name: string;
  role?: string;
  avatar?: string;
  className?: string;
}

export function Author({ name, role, avatar, className }: AuthorProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {avatar ? (
        <Image src={avatar} alt="" width={40} height={40} className="size-10 rounded-full border border-border object-cover" />
      ) : (
        <span className="grid size-10 place-items-center rounded-full border border-accent-soft-border bg-accent-soft text-xs font-semibold">
          {initials}
        </span>
      )}
      <div className="leading-tight">
        <p className="text-sm font-semibold">{name}</p>
        {role && <p className="text-xs text-foreground-muted">{role}</p>}
      </div>
    </div>
  );
}
