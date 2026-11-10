import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";

type Ctx = { go: (to: string, params?: Record<string, string>) => void };
const TransitionCtx = createContext<Ctx>({ go: () => {} });

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [closing, setClosing] = useState(false);

  const go: Ctx["go"] = (to, params) => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigate({ to: to as any, params: params as any }).then(() =>
        setTimeout(() => setClosing(false), 60),
      );
    }, 750);
  };

  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <div
        key={closing ? "close" : location.pathname}
        className={`split-overlay ${closing ? "is-closing" : "is-opening"}`}
        aria-hidden
      >
        <div className="split-half split-left" />
        <div className="split-half split-right" />
        <div className="split-seam" />
        <div className="split-mark font-display">G</div>
      </div>
    </TransitionCtx.Provider>
  );
}

export const useSplitNav = () => useContext(TransitionCtx);

export function SplitLink({
  to,
  params,
  className,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  className?: string;
  children: ReactNode;
}) {
  const { go } = useSplitNav();
  const href = params
    ? Object.entries(params).reduce((s, [k, v]) => s.replace(`$${k}`, v), to)
    : to;
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        go(to, params);
      }}
    >
      {children}
    </a>
  );
}
