import { createClient } from "@/lib/supabase/server";
import RecruitmentClient from "./RecruitmentClient";

export default async function RecruitmentPage() {
  const supabase = await createClient();

  const [
    { data: jobs, error: jobsError },
    { data: applications, error: appsError }
  ] = await Promise.all([
    supabase.from("jobs").select("*").order("created_at", { ascending: false }),
    supabase.from("applications").select("*").order("created_at", { ascending: false })
  ]);

  if (jobsError) console.error("Error fetching jobs:", jobsError);
  if (appsError) console.error("Error fetching applications:", appsError);

  return <RecruitmentClient jobs={jobs || []} applications={applications || []} />;
}
