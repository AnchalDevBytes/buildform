import { ReactNode } from "react";
import { ElementsType } from "@/components/FormElements";
import { Badge } from "@/components/ui/badge";
import { format } from "util";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";

export function RowCell ({ type , value } : { type: ElementsType, value: string}) {
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