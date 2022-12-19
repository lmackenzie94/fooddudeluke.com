// doesn't work if you include the .ts extension
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchMostRecentImages } from '../../lib/my-food/fetchInstaImages'
import { uploadImages } from '../../lib/my-food/uploadImagesToCloudinary'

// TODO: properly type this

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.MY_SECRET)

      if (!decoded) {
        res.status(401).json({ message: 'Invalid token' })
      }
    } catch (e) {
      res.status(401).json({ message: 'Something went wrong' })
      return
    }
  } else {
    res.status(401).json({ message: 'Invalid token' })
    return
  }

  console.log('Token is valid, fetching images...')

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
