import { createClient } from "@supabase/supabase-js";

const bucketName = "Myforum";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

if (!url || !key) {
  throw new Error("Supabase URL or KEY is missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY in your .env.local");
}
// Create Supabase client
const supabase = createClient(url, key);

// Upload file using standard upload
export async function uploadFile(image: File) {
  const timeStamp = Date.now();
  const pathName = `khanakorn-${timeStamp}-${image?.name}`;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(pathName, image);
  if (error) {
  } else {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(pathName);

    return data.publicUrl;
  }
}
