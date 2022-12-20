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

    if (authHeader?.startsWith('Bearer ')) {
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
        await revalidateImagePages()

        return res.status(200).json({
          message:
            'No images found. Change your account to public, dummy! Revalidated image pages, for the hell of it.',
        })
      }

      const imageCaptions = getNewImageCaptions(images)

      console.log(`Uploading the following image(s) to Cloudinary:`)
      console.log(imageCaptions)

      await uploadImages(images)

      const successMessage = `Donezo! Uploaded ${images.length} image(s) to Cloudinary! (${imageCaptions})`

      await revalidateImagePages()

      return res.status(200).json({ message: successMessage })
    } catch (e) {
      throw new Error(`Error fetching images: ${e.message}`)
    }
  } catch (e) {
    return res.status(500).json({ message: `Oopsie Daisy: ${e.message}` })
  }
}

function getNewImageCaptions(images: Image[]) {
  return images.map((image) => image.caption).join(' AND ')
}

async function revalidateImagePages() {
  console.log('Revalidating image pages...')
  console.log(process.env)
  console.log('VERCEL_URL', process.env.VERCEL_URL)
  // revalidate images by making request to /api/revalidate
  const baseURL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  return await fetch(`${baseURL}/api/revalidate?images=true`)
}
