import { ReactNode } from "react";
import { CheckboxFieldFormElement } from "./fields/CheckboxField";
import { DateFieldFormElement } from "./fields/DateField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SelectedFieldFormElement } from "./fields/SelectedField";
import { SeparatorFieldFormElement } from "./fields/SeparatorField";
import { SpacerFieldFormElement } from "./fields/SpacerField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { TextAreaFieldFormElement } from "./fields/TextAreaField";
import { TextFieldFormElement } from "./fields/TextFields";
import { TitleFieldFormElement } from "./fields/TitleField";

export type ElementsType = 
    "TextFields" |
    "TitleField" | 
    "SubTitleField" |
    "ParagraphField" |
    "SeparatorField" |
    "SpacerField" |
    "NumberField" |
    "TextAreaField" |
    "DateField" |
    "SelectedField" |
    "CheckboxField";

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
        isInValid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

    validate: (FormElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: {
        title?: string;
        text?: string;
        children? : ReactNode;
        [key : string] : ReactNode | string | number | boolean | undefined;
    }
}

type FormElementsType = {
    [key in ElementsType] : FormElement;
};

export const FormElements : FormElementsType = {
    TextFields : TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFieldFormElement,
    DateField: DateFieldFormElement,
    SelectedField: SelectedFieldFormElement,
    CheckboxField: CheckboxFieldFormElement
}
