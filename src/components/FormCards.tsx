import { GetForms } from "../../actions/form";
import { FormCard } from "@/components/FormCard";

export async function FormCards() {
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
