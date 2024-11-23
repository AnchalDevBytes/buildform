import React, { Suspense } from 'react'
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/btns/CreateFormBtn';
import { CardStatsWrapper } from '@/components/CardStatsWrapper';
import { StatsCards } from '@/components/StatsCards';
import { FormCards } from '@/components/FormCards';
import { FormCardSkeleton } from '@/components/FormCardSkeleton';

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className='container pt-4 items-center flex flex-col mx-auto'>
      <Suspense fallback={<StatsCards loading={true}/>}>
        <CardStatsWrapper/>
      </Suspense>
      <Separator className='my-6'/>
      <h2 className='text-4xl font-bold tracking-widest col-span-2'>Your Form</h2>
      <Separator className='my-6'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormBtn/>
        <Suspense
          fallback={[1,2,3,4].map((_, index) => (
            <FormCardSkeleton key={index}/>
          ))}
        >
          <FormCards/>
        </Suspense>
      </div>
    </div>
  )
}
