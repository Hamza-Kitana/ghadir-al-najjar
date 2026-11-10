import { useLocation } from "@tanstack/react-router";
import { SplitLink } from "./Transition";
import { contact } from "@/lib/services";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/services", label: "الخدمات" },
  { to: "/gallery", label: "المعرض" },
  { to: "/about", label: "عن غدير" },
];

export function Nav() {
  const { pathname } = useLocation();
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-12">
      <SplitLink to="/" className="font-display text-2xl tracking-wide text-gold-gradient">
        Ghadeer
      </SplitLink>
      <nav className="glass flex gap-1 rounded-full p-1">
        {links.map((l) => {
          const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
          return (
            <SplitLink
              key={l.to}
              to={l.to}
              className={`rounded-full px-3 py-1.5 text-sm transition md:px-5 ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              {l.label}
            </SplitLink>
          );
        })}
      </nav>
    </header>
  );
}

const Ic = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.3 7.3 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.3-1.5Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.3H7.6V13h2.7v8h3.2Z" />
    </svg>
  ),
  phone: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7.01Zm-7.01 15.24h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.15.82.84-3.07-.2-.32a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.85 5.8 2.4a8.16 8.16 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.17 8.2Zm4.49-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.49 1.08 2.49.72 2.94.67.45-.05 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  ),
};

export function Socials() {
  const items = [
    { href: contact.instagram, icon: Ic.instagram, label: "Instagram" },
    { href: contact.tiktok, icon: Ic.tiktok, label: "TikTok" },
    { href: contact.facebook, icon: Ic.facebook, label: "Facebook" },
    { href: contact.whatsapp, icon: Ic.whatsapp, label: "WhatsApp" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((s, i) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="social-btn rise"
          style={{ animationDelay: `${1.4 + i * 0.12}s` }}
        >
          {s.icon}
        </a>
      ))}
      <a
        href={`tel:${contact.phone}`}
        className="social-btn rise w-auto gap-2 px-4"
        style={{ animationDelay: "1.9s" }}
      >
        {Ic.phone}
        <span dir="ltr" className="text-sm tracking-wider">
          {contact.phoneLabel}
        </span>
      </a>
    </div>
  );
}
