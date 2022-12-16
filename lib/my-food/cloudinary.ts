export async function search(options: any = {}) {
  const params = {
    ...options,
    with_field: 'context',
    expression: 'folder="food-dude-luke"',
  }

  if (options.nextCursor) {
    params.next_cursor = options.nextCursor
    delete params.nextCursor
  }

  const paramString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')

  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`,
    {
      headers: {
        // Buffer converts the string to base64
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ':' +
            process.env.CLOUDINARY_API_SECRET
        ).toString('base64')}`,
      },
    }
  ).then((r) => r.json())

  return results
}

export interface FoodImage {
  id: string
  title: string
  caption: string | null
  instaUploadTimestamp: number | null
  image: string
  width: number
  height: number
}

export function mapImageResources(resources): FoodImage[] {
  return resources.map((resource) => {
    const { width, height } = resource
    return {
      id: resource.asset_id,
      title: resource.public_id,
      caption: resource.context ? resource.context.caption : null,
      instaUploadTimestamp: resource.context
        ? resource.context.uploadTimestamp
        : null,
      image: resource.secure_url,
      width,
      height,
    }
  })
}
