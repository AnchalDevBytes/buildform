"use client";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "@/components/FormElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "@/hooks/useDesigner";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";

const type : ElementsType = "TextAreaField";

const extraAttributes = {
    label: "Text area",
    helperText : "Helper Text",
    required: false,
    placeHolder: "value here...",
    rows: 3,
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    rows: z.number().min(1).max(10),
});

export const TextAreaFieldFormElement: FormElement = {
    type,
    construct: (id : string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon : BsTextareaResize,
        label: "TextArea Field",
    },
    designerComponent : DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: (
        formElement : FormElementInstance,
        currentValue: string
    ) : boolean => {
        const element = formElement as CustomInstance;
        if(element.extraAttributes.required) {
            return currentValue.length > 0;
        }
        return true;
    }
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes; 
}

function DesignerComponent({ elementInstance } : { elementInstance : FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Textarea readOnly disabled placeholder={placeHolder} />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    )
}

function FormComponent({ 
    elementInstance, 
    submitValue, 
    isInValid,
    defaultValue
} : { 
    elementInstance : FormElementInstance, 
    submitValue?: SubmitFunction,
    isInValid?: boolean,
    defaultValue?: string
}) {

    const element = elementInstance as CustomInstance;

    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInValid === true);
    },[isInValid]);

    const { label, required, placeHolder, helperText } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && "text-red-500")}>
                {label}
                {required && "*"}
            </Label>
            <Input
                className={cn(error && "text-red-500")} 
                placeholder={placeHolder} 
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => {
                    if(!submitValue) return;
                    const valid = TextAreaFieldFormElement.validate(element, e.target.value);
                    setError(!valid);
                    if(!valid) return;
                    submitValue(element.id, e.target.value)
                }}
                value={value}
            />
            {helperText && (
                <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>
            )}
        </div>
    )
}

type propertirsFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance } : { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();

    const form = useForm<propertirsFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    },[element, form]);

    function applyChanges(values: propertirsFormSchemaType) {
        const { helperText, label, placeHolder, required } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required
            }
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
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The label of the field. <br/> It will be displayed above the field
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="placeHolder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PlaceHolder</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The placeholder of the field.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Helper Text</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The helper text of the field. <br/> It will be displayed below the field
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Label</FormLabel>
                                <FormDescription>
                                    The label of the field. <br/> It will be displayed above the field
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
