import { TextFieldFormElement } from "./fields/TextFields";

export type ElementsType = "TextFields";

export type SubmitFunction = (key: string, value: string) => void;

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
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: (key: string, value: string) => void;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
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
