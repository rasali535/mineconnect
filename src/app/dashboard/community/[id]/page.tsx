import { createClient } from "@/lib/supabase/server";
import CommunityRequestDetailClient from "./CommunityRequestDetailClient";

export default async function CommunityRequestPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: request } = await supabase
    .from("community_requests")
    .select("*")
    .eq("id", params.id)
    .single();

  return <CommunityRequestDetailClient request={request} />;
}
