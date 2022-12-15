import { v2 as cloudinary } from 'cloudinary' // TODO: should this be a regular dependency?

import { type Image } from './fetchInstaImages'

const OPTIONS = {
  folder: 'food-dude-luke',
  tags: 'fdl-instagram',
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// upload single image to cloudinary
const uploadImageToCloudinary = async (image: Image) => {
  console.log('Uploading image to Cloudinary...', image)
  const { id: fileName, url: file, caption = '', uploadTimestamp = '' } = image

  // REMINDER: caption can't have emojis
  try {
    const { secure_url } = await cloudinary.uploader.unsigned_upload(
      file,
      'food-dude-luke', // upload preset
      {
        ...OPTIONS,
        public_id: `fdl-${fileName}`,
        context: `caption=${caption}|uploadTimestamp=${uploadTimestamp}`,
      }
    )
    return secure_url
  } catch (error) {
    console.error('Oops, something went wrong homie: ', error)
  }
}

// will only delete 1000 images at a time
// https://cloudinary.com/documentation/admin_api#delete_resources_by_tags
export const deleteAllExistingImages = (): void => {
  cloudinary.api
    .delete_resources_by_tag(OPTIONS.tags)
    .then((res) => {
      console.log('Deleted all existing images')
      console.log(res)
    })
    .catch((err) => console.log(err))
}

// upload images to cloudinary
export const uploadImages = async (images: Image[]) => {
  const promises = []
  images.forEach((image) => {
    promises.push(uploadImageToCloudinary(image))
  })
  return await Promise.all(promises)
}
