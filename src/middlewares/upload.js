import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary automatically picks credentials from CLOUDINARY_URL env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // optional if CLOUDINARY_URL set
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "demikvx8i", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

export const upload = multer({ storage });
