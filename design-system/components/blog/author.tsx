import Image from "next/image";
import { cn } from "../../lib/cn";

export interface AuthorProps {
  name: string;
  role?: string;
  avatar?: string;
  size?: "sm" | "md";
  className?: string;
}

export function Author({ name, role, avatar, size = "md", className }: AuthorProps) {
  const px = size === "sm" ? 32 : 40;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {avatar ? (
        <Image src={avatar} alt="" width={px} height={px} className="rounded-full border border-border object-cover" />
      ) : (
        <span
          style={{ width: px, height: px }}
          className="grid place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary-soft-foreground"
        >
          {initials}
        </span>
      )}
      <div className="leading-tight">
        <p className="text-sm font-medium text-foreground">{name}</p>
        {role && <p className="text-xs text-foreground-subtle">{role}</p>}
      </div>
    </div>
  );
}
