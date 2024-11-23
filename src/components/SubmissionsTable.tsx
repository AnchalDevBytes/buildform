import { GetFormWithSubmissions } from "../../actions/form";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import { 
    Table, 
    TableHeader, 
    TableRow,
    TableBody,
    TableCell,
    TableHead
  } from '@/components/ui/table';
  import { formatDistance } from 'date-fns';
import { RowCell } from "@/components/RowCell";

type Row = { [key: string] : string } & {
    submittedAt: Date;
}

export async function SubmissionsTable({ id } : { id: number }) {
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