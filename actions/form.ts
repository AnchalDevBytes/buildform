"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { formSchema, formSchemaType } from "../models/formTypes";

class UserNotFoundErr extends Error {};

async function getCurrentUserOrThrow () {
    const user = await currentUser();
    if(!user) {
        console.error("User not found");
        throw new UserNotFoundErr("please signup or signin to create your form");
    }
    return user;
}

export async function GetFormStats() {
    try {
        const user = await getCurrentUserOrThrow();
    
        const stats = await prisma.form.aggregate({
            where : {
                userId : user.id,
            },
            _sum : {
                visits : true,
                submissions : true
            }
        })

        if(!stats) {
            throw new Error("Failed to retrieve form statistics");
        }
    
        const visits = stats._sum.visits || 0;
        const submissions = stats._sum.submissions || 0;
    
        let submissionRate = 0;
    
        if(visits > 0) {
            submissionRate = (submissions / visits) * 100;
        }
    
        const bounceRate = 100 - submissionRate;
    
        return {
            visits, submissions, submissionRate, bounceRate
        }
    } catch (error) {
        if(error instanceof Error) {
            console.error("Error in GetFormStats: ", error.message);
            throw new Error(error.message);
        } else {
            throw new Error('Failed to retrieve form statistics');
        }
    }
}

export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data);
    if(!validation.success) {
        throw new Error("form inputs are not valid!");
    }
    const user = await getCurrentUserOrThrow();

    const { name, description } = data;

    const form = await prisma.form.create({
        data : {
            userId : user.id,
            name,
            description
        }
    })

    if(!form) {
        throw new Error("error while creating form");
    }
    return form.id;
}

export async function GetForms() {
    const user = await getCurrentUserOrThrow();

    return await prisma.form.findMany({
        where: {
            userId: user.id,
        },
        orderBy:{
            createdAt: "desc",
        }
    })
}

export async function GetFormById(id: number) {
    const user = await getCurrentUserOrThrow();

    return await prisma.form.findUnique({
        where: {
            userId : user.id,
            id
        }
    })
}

export async function UpdateFormContent(id: number, jsonContent: string) {
    const user = await getCurrentUserOrThrow();

    return await prisma.form.update({
        where: {
            userId: user.id,
            id,
        },
        data: {
            content: jsonContent
        }
    })
}

export async function PublishForm(id: number) {
    const user = await getCurrentUserOrThrow();

    return await prisma.form.update({
        data: {
            published: true,
        },
        where: {
            userId: user.id,
            id
        }
    })
}

export async function GetFormContentByUrl(formUrl: string) {
    return await prisma.form.update({
        select: {
            content: true,
        },
        data: {
            visits: {
                increment: 1
            }
        },
        where: {
            shareUrl: formUrl
        }
    })
}

export async function SubmitForm(formUrl: string, content: string) {
    return await prisma.form.update({
        data: {
            submissions: {
                increment : 1
            },
            formSubmissions : {
                create: {
                    content
                }
            }
        },
        where: {
            shareUrl: formUrl,
            published: true
        }
    })
}

export async function GetFormWithSubmissions(id: number) {
    const user = await getCurrentUserOrThrow();

    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id
        },
        include : {
            formSubmissions: true
        }
    })
}
