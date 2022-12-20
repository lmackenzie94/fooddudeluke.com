'use client' // TODO: understand the error message when this is removed...
// "Error: Functions cannot be passed directly to Client Components because they're not serializable."

import { CldImage } from 'next-cloudinary'

import styles from './ImageGrid.module.scss'

const { theme } = require('../tailwind.config.js')
import type { FoodImage } from 'lib/my-food/cloudinary'

function ImageGrid({ images }: { images: FoodImage[] }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
      data-test="image-grid"
    >
      {images.map((image, i) => {
        const hoverColor =
          i % 4 === 0
            ? 'bg-blue/70'
            : i % 3 === 0
            ? 'bg-yellow/75'
            : i % 2 === 0
            ? 'bg-green/70'
            : 'bg-orange/75'

        const bgLoadingColor =
          i % 4 === 0
            ? 'bg-blue/25'
            : i % 3 === 0
            ? 'bg-yellow/25'
            : i % 2 === 0
            ? 'bg-green/25'
            : 'bg-orange/25'

        return (
          <div
            key={i}
            data-test="instagram-image"
            className={`relative aspect-square overflow-hidden rounded-md ${styles.imageContainer} ${bgLoadingColor}`}
          >
            {/* using CldImage loads the images directly from the Cloudinary CDN,
            which bypasses the Next.js image optimization (which is unnecessary since Cloudinary handles optimization).
            This also allows us to use the full range of Cloudinary features.
            */}
            <CldImage
              src={image.title} // public id
              width={image.width}
              height={image.height}
              sizes={`(max-width: ${theme.screens.sm}) 45vw, (max-width: ${theme.screens.md}) 180px, 200px`}
              placeholder="blur"
              alt={image.caption}
            />
            <p
              data-test="caption-overlay"
              className={`absolute top-0 left-0 flex h-full w-full items-center justify-center p-4 text-center text-xs font-semibold text-white opacity-0 transition-opacity duration-300 ease-out hover:opacity-100 md:text-base ${hoverColor}`}
            >
              {image.caption}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default ImageGrid
