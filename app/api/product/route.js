import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { cloudinaryUploader } from "@/app/lib/cloudinaryUploader";

export async function POST(request){
    let body = await request.json();

    let image = await cloudinaryUploader(body.image);

    body = {
        ...body,
        image: image.secure_url
    }

    try {
        const res = await prisma.product.create({ data: body});
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function GET(request) {

    try {
        let res = await prisma.product.findMany({});
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json(error);
    }
}

