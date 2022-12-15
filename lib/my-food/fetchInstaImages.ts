import fetch from 'node-fetch' // TODO: need this..?

export interface Image {
  id: string
  url: string
  caption: string
  uploadTimestamp: number
}

// REMEMBER: Instagram account must be public
const headers = {
  'X-RapidAPI-Host': 'instagram130.p.rapidapi.com',
  'X-RapidAPI-Key': process.env.INSTA_API_KEY,
}

export const fetchMostRecentImages = async (num: number): Promise<Image[]> => {
  console.log(`Fetching most recent ${num} Instagram images...`)

  try {
    const res = await fetch(`${process.env.INSTA_API_URL}&first=${num}`, {
      headers,
    })

    if (res.ok) {
      const json: any = await res.json()
      const images: Image[] = json.edges.map((edge: any) => {
        return {
          id: edge.node.id,
          url: edge.node.display_url,
          caption: edge.node.edge_media_to_caption.edges[0].node.text,
          uploadTimestamp: edge.node.taken_at_timestamp,
        }
      })

      return images
    }
  } catch (err) {
    console.log('Error fetching most recent images', err)
    return err
  }
}

export const fetchAllInstagramImages = async (
  endCursor: string
): Promise<Image[]> => {
  const URL = `${process.env.INSTA_API_URL}&first=80${
    endCursor ? `&after=${endCursor}` : ''
  }`

  const images = []

  try {
    const res = await fetch(URL, {
      headers,
    })

    if (res.ok) {
      // add to images array
      const json: any = await res.json()

      json.edges.forEach((edge) => {
        images.push({
          id: edge.node.id,
          url: edge.node.display_url,
          caption: edge.node.edge_media_to_caption.edges[0].node.text,
          uploadTimestamp: edge.node.taken_at_timestamp,
        })
      })

      if (json.page_info.has_next_page) {
        // fetch next page
        fetchAllInstagramImages(json.page_info.end_cursor)
      } else {
        // write to file
        // const filePath = path.join(process.cwd(), 'instagram-input.json')
        // fs.writeFileSync(filePath, JSON.stringify(images))
        console.log('DONE FETCHING INSTA IMAGES')
        console.log('Number of images:', images.length)
        return images
      }
    }
  } catch (err) {
    console.log('COULD NOT GET INSTA IMAGES', err)
  }
}
