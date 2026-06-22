import { createClient } from "@/lib/supabase/server";
import ComplianceClient from "./ComplianceClient";

export default async function CompliancePage() {
  const supabase = await createClient();

  const { data: contractors, error } = await supabase
    .from("contractors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contractors:", error);
  }

  return <ComplianceClient contractors={contractors || []} />;
}
