"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithCode } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";

export function CodeLoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const session = loginWithCode(code);

    if (!session) {
      setError("Code d’accès invalide. Réessaie.");
      setLoading(false);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <Field
        label="Code d’accès"
        htmlFor="access-code"
        hint="Entre ton code personnel pour déverrouiller le dashboard."
      >
        <Input
          id="access-code"
          name="access-code"
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Ton code d’accès"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          autoFocus
        />
      </Field>

      {error ? (
        <p className="flex items-center gap-2 text-xs font-bold text-red-500">
          <span aria-hidden="true">✕</span>
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading || code.trim().length === 0}
      >
        {loading ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
