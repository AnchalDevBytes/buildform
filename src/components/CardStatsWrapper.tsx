"use client"
import { useRouter } from "next/navigation";
import { GetFormStats } from "../../actions/form";
import { StatsCards } from "@/components/StatsCards";

export async function CardStatsWrapper() {
    const router = useRouter();
    try {
      const stats = await GetFormStats();
      if(!stats) {
        return <StatsCards loading={true}/>
      }
      return <StatsCards loading={false} data={stats} />
    } catch (error) {
      if (error instanceof Error) {
        router.replace("/sign-in")
      } else {
        return <div>Something went wrong while getting form stats</div>;
      }
    }
}
