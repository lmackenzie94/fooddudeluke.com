// doesn't work if you include the .ts extension
import { fetchMostRecentImages } from '../../lib/my-food/fetchInstaImages'
import { uploadImages } from '../../lib/my-food/uploadImagesToCloudinary'

// TODO: properly type this

export default async function handler(req: any, res: any) {
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
