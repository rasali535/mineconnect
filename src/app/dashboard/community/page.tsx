import { createClient } from "@/lib/supabase/server";
import CommunityClient from "./CommunityClient";

export default async function CommunityPage() {
  const supabase = await createClient();

  const { data: requests, error } = await supabase
    .from("community_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching community requests:", error);
  }

  return <CommunityClient requests={requests || []} />;
}
