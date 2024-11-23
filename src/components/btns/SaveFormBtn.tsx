import React, { useTransition } from 'react'
import { HiSaveAs } from 'react-icons/hi';
import useDesigner from '@/hooks/useDesigner';
import { toast } from 'react-toastify';
import { UpdateFormContent } from '../../../actions/form';
import { Button } from '@/components/ui/button';

const SaveFormBtn = ({ id } : { id : number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast.success("Form submitted successfully!");
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message);
      } else {
        throw new Error("unknown error occured");
      }
    }
  }

  return (
    <Button
      variant={"outline"} 
      className='gap-2'
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
        <HiSaveAs className="h-4 w-4"/>
        Save
    </Button>
  )
}

export default SaveFormBtn;
