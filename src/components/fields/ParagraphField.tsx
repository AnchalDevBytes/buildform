"use client";
import { ElementsType, FormElement, FormElementInstance } from "@/components/FormElements";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "@/hooks/useDesigner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";

const type : ElementsType = "ParagraphField";

const extraAttributes = {
    title: "Text here",
}

const propertiesSchema = z.object({
    text: z.string().min(2).max(500)
});

export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id : string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon : BsTextParagraph,
        label: "Paragraph Field",
    },
    designerComponent : DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes; 
}

function DesignerComponent({ elementInstance } : { elementInstance : FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { text } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Paragraph field</Label>
            <p>{text}</p>
        </div>
    )
}

function FormComponent({ 
    elementInstance,
} : { 
    elementInstance : FormElementInstance,
}) {

    const element = elementInstance as CustomInstance;

    const { text } = element.extraAttributes;
    return <p>{text}</p>
}

type propertirsFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance } : { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();

    const form = useForm<propertirsFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            text: element.extraAttributes.text
        },
    });

    useEffect(() => {
        const textValue = element.extraAttributes?.text;
        const argument = textValue !== undefined ? { text : textValue} : undefined;
        form.reset(argument);
    },[element, form]);

    function applyChanges(values: propertirsFormSchemaType) {
        const { text } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {text}
        })
    }

    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Textarea 
                                    rows={5}
                                    {...field}
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
