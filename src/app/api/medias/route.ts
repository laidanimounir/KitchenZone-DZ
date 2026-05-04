"use server";

import { uploadImage } from "@/lib/s3";
import db from "@/lib/supabase/db";
import { medias } from "@/lib/supabase/schema";
import { mediaSchema } from "@/validations/medias";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as z.infer<typeof mediaSchema>;
  const validation = mediaSchema.safeParse(data);

  if (validation.success === false) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  let statusCode = 201;
  let errorMessage = "Unexpected Error";

  const uploadResponse = await Promise.all(
    Object.entries(data).map(async ([index, file]) => {
      const fileExtension = file.type.split("/")[1];
      const fileName = nanoid() + "." + fileExtension;

      try {
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await uploadImage({
          file: buffer,
          fileName,
        });

        if (result) {
          await db
            .insert(medias)
            .values({ alt: file.name, key: result.url })
            .returning();

          return file.name;
        }
      } catch (err) {
        statusCode = 400;
        errorMessage = err.message;
        return { message: err.message };
      }
    }),
  );

  return statusCode >= 300
    ? NextResponse.json({ message: errorMessage }, { status: statusCode })
    : NextResponse.json(uploadResponse, { status: statusCode });
}