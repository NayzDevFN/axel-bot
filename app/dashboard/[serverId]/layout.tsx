import { notFound } from "next/navigation";
import { ServerSidebar } from "@/components/dashboard/ServerSidebar";
import { servers, getServer } from "@/lib/servers";

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const server = getServer(serverId);

  if (!server) notFound();

  return (
    <div className="animate-fade-in">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ServerSidebar
          serverId={server.id}
          serverName={server.name}
          serverIcon={server.icon}
        />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
