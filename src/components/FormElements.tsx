import { TextFieldFormElement } from "./fields/TextFiels";

export type ElementsType = "TextFields";

export type FormElement = {
    type : ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    }

    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC;
    propertiesComponent: React.FC;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>
}

type FormElementsType = {
    [key in ElementsType] : FormElement;
};

export const FormElements : FormElementsType = {
    TextFields : TextFieldFormElement,
}