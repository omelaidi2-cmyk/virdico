import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

// Interface
export const SearchIcon = (p: IconProps) => <Svg {...stroke} strokeWidth={2} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></Svg>;
export const MenuIcon = (p: IconProps) => <Svg {...stroke} strokeWidth={2} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Svg>;
export const CloseIcon = (p: IconProps) => <Svg {...stroke} strokeWidth={2} {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const ArrowUpIcon = (p: IconProps) => <Svg {...stroke} strokeWidth={2} {...p}><path d="M12 19V5M5 12l7-7 7 7" /></Svg>;
export const CheckIcon = (p: IconProps) => <Svg {...stroke} strokeWidth={2.5} {...p}><path d="M5 12l5 5L20 7" /></Svg>;
export const LinkIcon = (p: IconProps) => <Svg {...stroke} strokeWidth={2} {...p}><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" /></Svg>;
export const FlaskIcon = (p: IconProps) => <Svg {...stroke} {...p}><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 006 21h12a1.7 1.7 0 001.5-2.5L14 9V3" /><path d="M7 15h10" /></Svg>;

// Catégories
export const UsersIcon = (p: IconProps) => <Svg {...stroke} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.5a3.5 3.5 0 010 7M18.5 14.8c1.6.8 2.6 2.5 3 5.2" /></Svg>;
export const MailIcon = (p: IconProps) => <Svg {...stroke} {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3.5 7l8.5 6 8.5-6" /></Svg>;
export const BoardIcon = (p: IconProps) => <Svg {...stroke} {...p}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M9 4v16M3 10h18" /></Svg>;
export const SparkIcon = (p: IconProps) => <Svg {...stroke} {...p}><path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" /></Svg>;
export const BrowserIcon = (p: IconProps) => <Svg {...stroke} {...p}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></Svg>;
export const ShieldIcon = (p: IconProps) => <Svg {...stroke} {...p}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></Svg>;
export const ChartIcon = (p: IconProps) => <Svg {...stroke} {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></Svg>;
export const ServerIcon = (p: IconProps) => <Svg {...stroke} {...p}><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></Svg>;

// Réseaux sociaux
export const XIcon = (p: IconProps) => <Svg fill="currentColor" {...p}><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" /></Svg>;
export const FacebookIcon = (p: IconProps) => <Svg fill="currentColor" {...p}><path d="M14 8.5V6.8c0-.8.5-1 .9-1h2.4V2h-3.3C10.4 2 9.7 4.7 9.7 6.4v2.1H7.5V12h2.2v10H14V12h3l.4-3.5H14z" /></Svg>;
export const LinkedInIcon = (p: IconProps) => <Svg fill="currentColor" {...p}><path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" /></Svg>;
