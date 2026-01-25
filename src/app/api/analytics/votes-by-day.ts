import { supabase } from "@/lib/supabase";

export async function GET() {
  // Fetch vote timestamps and aggregate by day on the server
  const { data, error } = await supabase
    .from("Vote")
    .select("createdAt")
    .order("createdAt", { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const day = new Date(row.createdAt).toISOString().slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }

  const result = Array.from(counts.entries())
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([label, votes]) => ({ label, votes }));

  return new Response(JSON.stringify(result), { status: 200 });
}
