import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { LuView } from 'react-icons/lu';
import { FaEdit, FaWpforms } from 'react-icons/fa';
import Link from 'next/link';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Button } from '@/components/ui/button';

export function FormCard({ form } : { form : Form }) {

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
