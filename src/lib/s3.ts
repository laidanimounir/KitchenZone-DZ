"use server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const bufferToFile = (buffer: Buffer) =>
  `data:image/webp;base64,${buffer.toString("base64")}`;

export const uploadImage = async ({
  file,
  fileName,
}: {
  file: Buffer | Blob;
  fileName: string;
}) => {
  const { data, error } = await supabase.storage
    .from("medias")
    .upload(fileName, file, {
      contentType: "image/webp",
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data: publicUrl } = supabase.storage
    .from("medias")
    .getPublicUrl(data.path);

  return { url: publicUrl.publicUrl, path: data.path };
};