import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from 'react-icons/md'
import { 
    AlertDialog, 
    AlertDialogTrigger,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle 
} from './ui/alert-dialog';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { PublishForm } from '../../actions/form';
import { useRouter } from 'next/navigation';

const PublishFormBtn = ({ id } : { id: number }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);
      toast.success("Form is published now!");
      router.refresh();
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message);
      } else {
        throw new Error("unknown error occured!")
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
            <MdOutlinePublish className="h-6 w-6"/>
            Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able to edit this form. <br/>
            <br/>
            <span className='font-medium'>
              By publishing this form you will make it available to the public and you will be able to collect submission.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            disabled={loading} 
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <FaSpinner className='animate-spin'/>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormBtn;
