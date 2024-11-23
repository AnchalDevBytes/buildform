import { ReactNode } from "react";
import { CheckboxFieldFormElement } from "@/components/fields/CheckboxField";
import { DateFieldFormElement } from "@/components/fields/DateField";
import { NumberFieldFormElement } from "@/components/fields/NumberField";
import { ParagraphFieldFormElement } from "@/components/fields/ParagraphField";
import { SelectedFieldFormElement } from "@/components/fields/SelectedField";
import { SeparatorFieldFormElement } from "@/components/fields/SeparatorField";
import { SpacerFieldFormElement } from "@/components/fields/SpacerField";
import { SubTitleFieldFormElement } from "@/components/fields/SubTitleField";
import { TextAreaFieldFormElement } from "@/components/fields/TextAreaField";
import { TextFieldFormElement } from "@/components/fields/TextFields";
import { TitleFieldFormElement } from "@/components/fields/TitleField";

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
