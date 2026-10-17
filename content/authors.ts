export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  href: string;
  avatar?: string;
}

// EDIT : vrai nom, photo (public/images/…) et bio
export const authors: Record<string, Author> = {
  founder: {
    id: "founder",
    name: "Your Name",
    role: "SaaS reviewer · Founder of Virdico",
    bio: "Write a 2–3 line bio: your experience, how many tools you've tested, and why readers can trust you.",
    href: "/about/",
  },
};
