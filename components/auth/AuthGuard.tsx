"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setAuthorized(true);
    setChecked(true);
  }, [router]);

  if (!checked || !authorized) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-brand-500/30 border-t-brand-500" />
        <p className="text-sm font-bold text-cream/70">Vérification de la connexion…</p>
      </div>
    );
  }

  return <>{children}</>;
}
