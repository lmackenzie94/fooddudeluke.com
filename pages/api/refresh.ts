// doesn't work if you include the .ts extension
import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchMostRecentImages } from '../../lib/my-food/fetchInstaImages'
import { uploadImages } from '../../lib/my-food/uploadImagesToCloudinary'

// TODO: properly type this

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // authorizing the request using secret query param
  // TODO: do this properly (JWT?)
  if (req.query.s !== process.env.MY_SECRET) {
    res.status(401).json({ message: 'Not today!' })
    return
  }

  const imagesToFetch: number = +req.query.num || 1

  try {
    const images = await fetchMostRecentImages(imagesToFetch)

    if (!images || images.length === 0) {
      res.status(200).json({
        message: 'No images found. Change your account to public, dummy!',
      })
      return
    }

    const imageCaptions = images
      .map((image: any) => image.caption)
      .join(' AND ')
    console.log(`Uploading the following image(s) to Cloudinary:`)
    console.log(imageCaptions)

    await uploadImages(images)

    const successMessage = `Donezo! Uploaded ${images.length} image(s) to Cloudinary! (${imageCaptions})`

    res.status(200).json({ message: successMessage })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Error fetching images' })
  }
}
