// doesn't work if you include the .ts extension
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { Image } from '../../lib/my-food/fetchInstaImages'
import { fetchMostRecentImages } from '../../lib/my-food/fetchInstaImages'
import { uploadImages } from '../../lib/my-food/uploadImagesToCloudinary'

// TODO: properly type this

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authHeader = req.headers.authorization

    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]

      const decoded = jwt.verify(token, process.env.MY_SECRET)

      if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' })
      }
    } else {
      return res.status(401).json({ message: 'Invalid token' })
    }

    console.log('Token is valid, fetching images...')

    const imagesToFetch: number = +req.query.num || 1

    try {
      const images = await fetchMostRecentImages(imagesToFetch)

      if (!images || images.length === 0) {
        return res.status(200).json({
          message: 'No images found. Change your account to public, dummy!',
        })
      }

      const imageCaptions = getNewImageCaptions(images)

      console.log(`Uploading the following image(s) to Cloudinary:`)
      console.log(imageCaptions)

      await uploadImages(images)

      // revalidate images by making request to /api/revalidate
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?images=true`
      )
      const json = await result.json()

      console.log(json.message)

      const successMessage = `Donezo! Uploaded ${images.length} image(s) to Cloudinary! (${imageCaptions})`

      return res.status(200).json({ message: successMessage })
    } catch (e) {
      throw new Error('Error fetching images')
    }
  } catch (e) {
    return res.status(500).json({ message: `Oopsie Daisy: ${e.message}` })
  }
}

function getNewImageCaptions(images: Image[]) {
  return images.map((image) => image.caption).join(' AND ')
}
