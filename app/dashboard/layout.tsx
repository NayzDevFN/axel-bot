import Link from "next/link";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        <div className="pointer-events-none fixed inset-0 opacity-70 [background:radial-gradient(ellipse_at_top,rgba(37,99,235,0.10),transparent_55%)]" />
        <DashboardTopbar />
        <div className="relative mx-auto max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </div>
        <footer className="relative border-t border-[#0e1c3f]/8 py-6 text-center text-xs text-cream/60">
          © {new Date().getFullYear()} Axel Bot · Serveur{" "}
          <Link href="/dashboard" className="font-bold text-brand-300 hover:underline">
            Axel community’s
          </Link>{" "}
          · Données de démonstration
        </footer>
      </div>
    </AuthGuard>
  );
}
