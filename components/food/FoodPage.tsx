'use client'

import Container from 'components/Container'
import ImageGrid from 'components/ImageGrid'
import Layout from 'components/Layout'
import RefreshButton from 'components/RefreshButton'
import type { FoodImage } from 'lib/my-food/cloudinary'
import { useEffect, useState } from 'react'

const IMAGES_PER_PAGE = 20

export default function FoodPage(props: {
  preview?: boolean
  loading?: boolean
  food: FoodImage[]
}) {
  const { preview, loading, food } = props
  // const { title, description } = settings || {}

  const [currentPage, setCurrentPage] = useState(1)
  const [images, setImages] = useState([])

  // const title = `my food. | ${SITE_NAME}`

  useEffect(() => {
    const sortedImages = food.sort((a, b) => {
      return b.instaUploadTimestamp - a.instaUploadTimestamp
    })
    setImages(sortedImages)
  }, [food])

  const imagesToShow = images?.slice(0, currentPage * IMAGES_PER_PAGE)

  const currentPageMessage = `Page ${currentPage} of ${Math.ceil(
    images.length / IMAGES_PER_PAGE
  )}`

  const loadMoreImages = async () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }

  return (
    <Layout preview={preview} loading={loading}>
      <Container>
        {/* <Head>
        <title>{title}</title>
      </Head> */}
        <div className="flex justify-between align-baseline">
          <h1 className="h1 with-mb">
            My Food.{' '}
            <span className="text-xs text-blue/20">{`(${food.length})`}</span>
          </h1>
          <RefreshButton buttonStyles="p-2 text-xl" />
        </div>

        <ImageGrid images={imagesToShow} />
        <p className="mt-4 text-right text-xs">{currentPageMessage}</p>

        {images.length > imagesToShow.length && (
          <button
            className="button mb-14 bg-blue text-white"
            onClick={loadMoreImages}
          >
            load more.
          </button>
        )}
      </Container>
    </Layout>
  )
}
