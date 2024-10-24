import { GetFormById, GetFormWithSubmissions } from '../../../../../actions/form';
import VisitBtn from '@/components/VisitBtn';
import FormLinkShare from '@/components/FormLinkShare';
import { StatsCard } from '../../page';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { ElementsType, FormElementInstance } from '@/components/FormElements';
import { 
  Table, 
  TableHeader, 
  TableRow,
  TableBody,
  TableCell,
  TableHead
} from '@/components/ui/table';
import { formatDistance } from 'date-fns';
import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'util';
import { Checkbox } from '@/components/ui/checkbox';

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

type Row = { [key: string] : string } & {
  submittedAt: Date;
}

async function SubmissionsTable({ id } : { id: number }) {
  const form = await GetFormWithSubmissions(id);

  if(!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string,
    label: string,
    required: boolean,
    type: ElementsType
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextFields" : 
      case "NumberField" :
      case "TextAreaField" :
      case "DateField" :
      case "SelectedField" :
      case "CheckboxField" :
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label as string,
          required: element.extraAttributes?.required as boolean,
          type: element.type
        });
        break;
      default: 
        break;
    }
  });

  const rows: Row[] = [];
  form.formSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className='text-2xl font-bold my-4'>Submissions</h1>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className='uppercase'>
                  {column.label}
                </TableHead>
              ))}
              <TableHead className='text-muted-foreground text-right uppercase'>
                 Submiited at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className='text-muted-foreground text-right'>
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function RowCell ({ type , value } : { type: ElementsType, value: string}) {
  let node: ReactNode = value;

  switch (type) {
    case "DateField" :
      if(!value) break;
      const date = new Date(value);
      node = <Badge>{format(date, "dd/MM/yyyy")}</Badge>
      break;
    case "CheckboxField" :
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled />
      break;
  }

  return <TableCell>{node}</TableCell>;
}
 