import { createClient } from "@/lib/supabase/server";
import SupplierListClient from "./SupplierListClient";

export default async function SuppliersPage() {
  const supabase = await createClient();

  // Fetch suppliers from database
  const { data: suppliers, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching suppliers:", error);
  }

  return <SupplierListClient suppliers={suppliers || []} />;
}
