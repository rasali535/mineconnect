import { createClient } from "@/lib/supabase/server";
import ContractorDetailClient from "./ContractorDetailClient";

export default async function ComplianceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: contractor, error } = await supabase
    .from("contractors")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !contractor) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Contractor not found</h2>
        <p style={{ color: "var(--text-secondary)" }}>The contractor ID "{id}" does not exist.</p>
      </div>
    );
  }

  return <ContractorDetailClient contractor={contractor} />;
}
