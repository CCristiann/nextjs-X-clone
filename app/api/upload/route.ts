import { UploadValidator } from "@/libs/validators/upload";
import { v2 as cloudinary } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { path } = UploadValidator.parse(reqBody);

  if (!path) return new Response("Image path is required.", { status: 400 });

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      timeout: 120000,
    };

    const result = await cloudinary.uploader.upload(path, options);
    const image = result.secure_url;

    return NextResponse.json(image, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("An error occured uploading image", {
      status: 500,
    });
  }
}
