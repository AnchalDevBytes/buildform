import { StatsCard } from "@/components/StatsCard";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { StatsCardsProps } from "@/Interfaces/UiInterfaces";

export function StatsCards(props : StatsCardsProps) {
    const { data, loading } = props;
  
    return (
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title="Total Visits"
          icon={<LuView className='text-green-600'/>}
          helperText='All time form visits'
          value={data?.visits.toLocaleString() ?? "0"}
          loading={loading}
          className=''
        />
        <StatsCard 
          title="Total Submissions"
          icon={<FaWpforms className='text-green-300'/>}
          helperText='All time form submissions'
          value={data?.submissions.toLocaleString() || ""}
          loading={loading}
          className=''
        />
        <StatsCard 
          title="Submission rate"
          icon={<HiCursorClick className='text-red-300'/>}
          helperText='Visits the result in form submission'
          value={data?.submissionRate.toLocaleString() + "%" || ""}
          loading={loading}
          className=''
        />
        <StatsCard 
          title="Bounce rate"
          icon={<TbArrowBounce className='text-red-600'/>}
          helperText='Visits that leaves without interaction'
          value={data?.bounceRate.toLocaleString() + "%" || ""}
          loading={loading}
          className=''
        />
      </div>
    )
}
