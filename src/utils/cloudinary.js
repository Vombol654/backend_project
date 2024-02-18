const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // after file upload
    console.log("your file is uploaded on cloudinary", response.url);
    return response;
  } catch (err) {
    // remove the locally saved temporary fileas the upload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};
