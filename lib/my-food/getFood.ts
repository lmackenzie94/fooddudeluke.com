import type { FoodImage } from 'lib/my-food/cloudinary'
import { mapImageResources, search } from 'lib/my-food/cloudinary'

export const getFood = async (numOfImages?: number): Promise<FoodImage[]> => {
  const results = await search({
    folder: 'food-dude-luke',
    // max_results: numOfImages,
    max_results: 500,
    // TODO: sort newest first without having to fetch all images
    // sort_by: 'context.uploadTimestamp',
  })

  const { resources } = results

  const images = mapImageResources(resources)

  const sortedImages = images.sort((a, b) => {
    return b.instaUploadTimestamp - a.instaUploadTimestamp
  })

  if (!numOfImages) {
    return sortedImages
  }

  return sortedImages.slice(0, numOfImages)
}
