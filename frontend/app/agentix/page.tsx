// app/agentixs/page.tsx  (or pages/agentixs.tsx)
export default function AgentixProxyPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <iframe
        src={process.env.NEXT_PUBLIC_AGENTIX_ORIGIN || "http://localhost:3001/"}
        className="w-full h-full border-0"
        title="Agentix"
      />
    </div>
  );
}
