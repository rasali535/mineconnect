import { createClient } from "@/lib/supabase/server";
import SupplierDetailClient from "./SupplierDetailClient";

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: supplier, error } = await supabase
    .from("suppliers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !supplier) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h2 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Supplier not found</h2>
        <p style={{ color: "var(--text-secondary)" }}>The supplier ID "{id}" does not exist.</p>
      </div>
    );
  }

  return <SupplierDetailClient supplier={supplier} />;
}
