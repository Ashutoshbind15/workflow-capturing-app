import { cloudinary } from "./imageuploader";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const uploadImageFromDataUri = async (dataUri, x, y, sx, sy) => {
  const result = {
    success: false,
    url: null,
  };

  try {
    const res = await cloudinary.uploader.upload(dataUri, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: "workflowsnaps",
      width: sx,
      height: sy,

      transformation: [
        {
          overlay: "circle",
          width: 50,
          height: 50,
          gravity: "xy_center",
          x: x - 25,
          y: y - 25,
          opacity: 60,
        },
      ],
    });

    result.success = true;
    result.url = res.secure_url;

    console.log(res);
  } catch (error) {
    console.error(error);
  }

  return result;
};

export const saveImageFromDataUriToLocalDisk = async (dataUri) => {
  const result = {
    success: false,
    url: null,
  };

  try {
    const matches = dataUri.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches) {
      return result;
    }

    const imageBuffer = Buffer.from(matches[2], "base64");
    const imageType = matches[1];

    const fileName = `${uuidv4()}.${imageType}`;

    fs.writeFileSync(`./public/dmp/${fileName}`, imageBuffer);

    result.success = true;
    result.url = `/public/${fileName}`;
  } catch (error) {
    console.error(error);
  }

  return result;
};
