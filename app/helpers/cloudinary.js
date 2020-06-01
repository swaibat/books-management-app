import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

export default {
  imageUpload(req, res, next) {
    cloudinary.uploader.upload(req.files.image.tempFilePath, (result, error) => {
      if (error) return res.status(400).send({ status: 400, message: 'image upload not successful' });
      req.body.image = result.url;
      next();
    });
  }
};
