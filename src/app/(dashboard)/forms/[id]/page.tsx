import { GetFormById } from '../../../../../actions/form';
import FormLinkShare from '@/components/FormLinkShare';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import VisitBtn from '@/components/btns/VisitBtn';
import { StatsCard } from '@/components/StatsCard';
import { SubmissionsTable } from '@/components/SubmissionsTable';

const FormDetailPage = async ({ params } : { params: {id: string }}) => {
    const { id } = params;
    const form = await GetFormById(Number(id));
    if(!form) {
      throw new Error("Form not found!");
    }

    const { visits, submissions } = form; 

    let submissionRate = 0;

    if(visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

  return (
    <div className='flex flex-col items-center w-full mx-auto px-2'>
      <div className='py-10 border-b border-muted flex items-center justify-center w-full'>
        <div className='flex justify-between container'>
          <h1 className='text-4xl font-bold truncate tracking-wider'>{form.name}</h1>
          <VisitBtn shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className='py-4 border-b border-muted flex items-center justify-center w-full'>
        <div className='container flex gap-2 items-center justify-between'>
          <FormLinkShare shareUrl={form.shareUrl}/>
        </div>
      </div>
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container'>
        <StatsCard 
        title="Total Visits"
        icon={<LuView className='text-green-600'/>}
        helperText='All time form visits'
        value={visits.toLocaleString() || ""}
        loading={false}
        className=''
      />
      <StatsCard 
        title="Total Submissions"
        icon={<FaWpforms className='text-green-300'/>}
        helperText='All time form submissions'
        value={submissions.toLocaleString() || ""}
        loading={false}
        className=''
      />
      <StatsCard 
        title="Submission rate"
        icon={<HiCursorClick className='text-red-300'/>}
        helperText='Visits the result in form submission'
        value={submissionRate.toLocaleString() + "%" || ""}
        loading={false}
        className=''
      />
      <StatsCard 
        title="Bounce rate"
        icon={<TbArrowBounce className='text-red-600'/>}
        helperText='Visits that leaves without interaction'
        value={bounceRate.toLocaleString() + "%" || ""}
        loading={false}
        className=''
      />
      </div>
      <div className='container pt-10'>
        <SubmissionsTable id={form.id} />
      </div>
    </div>
  )
}

export default FormDetailPage;
