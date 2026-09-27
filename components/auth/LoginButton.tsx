"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export function LoginButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const connect = () => {
    setLoading(true);
    // TODO OAuth2 : rediriger vers /api/auth/discord quand le client Discord sera configuré.
    window.setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="mt-7 space-y-3">
      <button
        type="button"
        onClick={connect}
        disabled={loading}
        className="flex h-13 w-full items-center justify-center gap-3 rounded-full bg-[#5865F2] px-6 font-display text-base font-black text-white shadow-[0_12px_32px_-14px_rgba(88,101,242,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4752c4] active:scale-[0.99] disabled:opacity-70"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M20.317 4.369A19.79 19.79 0 0 0 15.432 3a13.6 13.6 0 0 0-.63 1.287 18.27 18.27 0 0 0-5.606 0A13.6 13.6 0 0 0 8.56 3a19.74 19.74 0 0 0-4.887 1.372C.588 8.98-.27 13.474.158 17.906a19.9 19.9 0 0 0 6.03 3.043 14.7 14.7 0 0 0 1.29-2.096 12.9 12.9 0 0 1-2.032-.976c.17-.124.337-.253.498-.386 3.927 1.817 8.18 1.817 12.061 0 .164.133.33.262.499.386-.65.385-1.334.709-2.036.978a14.7 14.7 0 0 0 1.29 2.095 19.86 19.86 0 0 0 6.035-3.043c.5-5.146-.856-9.6-3.474-13.537ZM8.02 15.18c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.201 0 2.176 1.085 2.156 2.418 0 1.334-.955 2.419-2.156 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.201 0 2.176 1.085 2.156 2.418 0 1.334-.955 2.419-2.156 2.419Z" />
        </svg>
        {loading ? "Redirection…" : "Se connecter avec Discord"}
      </button>
      <Link
        href="/dashboard"
        className="flex h-12 w-full items-center justify-center rounded-full border border-[#0e1c3f]/12 bg-white font-display text-sm font-black text-ink shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:bg-cream"
      >
        Continuer en mode démonstration →
      </Link>
    </div>
  );
}
