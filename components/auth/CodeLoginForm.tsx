"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { loginWithCode } from "@/lib/auth";

export function CodeLoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!code.trim()) {
      setError("Entre ton code d’accès.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      const account = loginWithCode(code);
      setLoading(false);

      if (!account) {
        setError("Code invalide. Seuls les codes autorisés peuvent se connecter.");
        return;
      }

      router.push("/dashboard");
    }, 450);
  };

  return (
    <form onSubmit={submit} className="mt-7 space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="access-code"
          className="block text-sm font-bold text-ink"
        >
          Code d’accès
        </label>
        <input
          id="access-code"
          type="password"
          autoComplete="one-time-code"
          spellCheck={false}
          placeholder="XXXX-XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-full border border-[#0e1c3f]/12 bg-white px-5 py-3 font-mono text-sm uppercase tracking-[0.18em] text-ink placeholder:tracking-[0.18em] placeholder:text-muted/60 transition-all duration-200 hover:border-[#0e1c3f]/25 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/12"
        />
        {error ? (
          <p className="flex items-center gap-2 text-xs font-bold text-red-500">
            <span aria-hidden="true">✕</span>
            {error}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex h-13 w-full items-center justify-center gap-3 rounded-full bg-ink px-6 font-display text-base font-black text-cream shadow-[0_12px_32px_-14px_rgba(14,28,63,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 active:scale-[0.99] disabled:opacity-70"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        {loading ? "Vérification du code…" : "Se connecter"}
      </button>
    </form>
  );
}
