import React, { ReactNode, Suspense } from 'react'
import { GetForms, GetFormStats } from '../../../actions/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LuView } from 'react-icons/lu';
import { HiCursorClick } from 'react-icons/hi';
import { FaEdit, FaWpforms } from 'react-icons/fa';
import { TbArrowBounce } from 'react-icons/tb';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BiRightArrowAlt } from "react-icons/bi";
import { formatDistance } from "date-fns";

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

async function CardStatsWrapper() {
  try {
    const stats = await GetFormStats();
    if(!stats) {
      return <StatsCards loading={true}/>
    }
    return <StatsCards loading={false} data={stats} />
  } catch (error) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    } else {
      return <div>Something went wrong while getting form stats</div>;
    }
  }
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

interface StatsCardInterface {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
}

export function StatsCard({ 
  title, 
  value, 
  helperText, 
  className, 
  loading, 
  icon 
} : StatsCardInterface) {
  return (
    <div className={`relative p-1 rounded-lg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-lg blur-sm opacity-75 animate-border" />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Card>
          <CardHeader className='flex flex-row items-center gap-2 justify-center pb-2'>
            <CardTitle className='text-sm tracking-wider font-medium text-muted-foreground'>
              {title}
            </CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {
                loading && 
                (<Skeleton>
                  <span className='opacity-0'>0</span>
                </Skeleton>)
              }
              {!loading && value}
            </div>
            <p className='text-xs text-muted-foreground pt-1'>{helperText}</p>
          </CardContent>
        </Card>
      </div>
    </div>
)
}

function StatsCards(props : StatsCardsProps) {
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

function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary/20 h-[190px] w-full'/>
}

async function FormCards() {
  try {
    const forms = await GetForms();
    if(!forms) {
      return <div>No forms found</div>;
    }
    return (
      <>
        {forms.map(form => (
            <FormCard key={form.id} form={form}/>
          ))}
      </>
    );
  } catch (error) {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    } else {
      return <div>Something went wrong while getting forms from FromCards</div>;
    }
  }
}

function FormCard({ form } : { form : Form }) {
  return (
    <Card className='shadow-md shadow-red-100'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 justify-between'>
          <span className='truncate text-base tracking-wide font-bold'>{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className='flex items-center gap-2'>
              <LuView className='text-muted-foreground'/>
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className='text-muted-foreground'/>
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className='w-full mt-2 text-sm gap-4'>
            <Link href={`/forms/${form.id}`}>View Submission <BiRightArrowAlt/></Link>
          </Button>
        )}
        {!form.published && (
          <Button 
            asChild
            variant={"secondary"} 
            className='w-full mt-2 text-sm gap-4'
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit/>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
