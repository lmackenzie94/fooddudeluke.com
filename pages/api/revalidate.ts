/**
 * This code is responsible for revalidating the cache when a post or question is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Trigger on: "Create", "Update", and "Delete"
 * 5. Filter: _type == "post" || _type == "question" || _type == "settings"
 * 6. Projection: Leave empty
 * 7. HTTP method: POST
 * 8. API version: v2021-03-25
 * 9. Include drafts: No
 * 10. HTTP Headers: Leave empty
 * 11. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random one if you haven't)
 * 12. Save the cofiguration
 * 13. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 14. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

// This has the same effect as Server-Side Rendering (SSR) - i.e. no revalidation time = no stale content
// BASICALLY, the Sanity webhook will be triggered when content is created, updated, or deleted...
// ...which sends a request to this api route, which then revalidates the affected routes

import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { type SanityClient, createClient, groq } from 'next-sanity'
import { type ParseBody, parseBody } from 'next-sanity/webhook'

export { config } from 'next-sanity/webhook'

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // check for images=true query param to indicate that we should revalidate the images pages (i.e. Home and /food)
    // works in Production but not in Development...
    if (req.query?.images === 'true') {
      const staleRoutes = ['/', '/food']
      console.log(
        `Revalidating the following routes: ${staleRoutes.join(', ')}`
      )

      await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

      const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
      console.log(updatedRoutes)

      return res.status(200).send(updatedRoutes)
    }

    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )
    if (isValidSignature === false) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (typeof body._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    const staleRoutes = await queryStaleRoutes(body as any)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

type StaleRoute =
  | '/'
  | `/posts`
  | `/questions`
  | `/posts/${string}`
  | `/questions/${string}`

async function queryStaleRoutes(
  body: Pick<ParseBody['body'], '_type' | '_id' | 'date' | 'slug'>
): Promise<StaleRoute[]> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  // Handle possible deletions
  if (body._type === 'post' || body._type === 'question') {
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id })
    if (!exists) {
      let staleRoutes: StaleRoute[] = ['/', `/${body._type}s`]
      if ((body.slug as any)?.current) {
        staleRoutes.push(`/${body._type}s/${(body.slug as any).current}`)
      }
      // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
      const moreStories = await client.fetch(
        groq`count(
          *[_type == body._type] | order(date desc, _updatedAt desc) [0...3] [dateTime(date) > dateTime($date)]
        )`,
        { date: body.date }
      )
      // If there's less than 3 posts with a newer date, we need to revalidate everything
      if (moreStories < 3) {
        return [
          ...new Set([
            ...(await queryAllRoutes(client, body._type)),
            ...staleRoutes,
          ]),
        ]
      }
      return staleRoutes
    }
  }

  switch (body._type) {
    case 'question':
      return await queryStaleQuestionRoutes(client, body._id)
    case 'post':
      return await queryStalePostRoutes(client, body._id)
    case 'settings':
      return await queryAllRoutes(client)
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

async function _queryAllRoutes(
  client: SanityClient,
  type?: 'post' | 'question'
): Promise<string[]> {
  if (type) {
    return await client.fetch(groq`*[_type == type].slug.current`)
  }

  const postSlugs = await client.fetch(groq`*[_type == "post"].slug.current`)
  const questionSlugs = await client.fetch(
    groq`*[_type == "question"].slug.current`
  )

  return [
    ...postSlugs.map((slug) => `/posts/${slug}`),
    ...questionSlugs.map((slug) => `/questions/${slug}`),
  ]
}

async function queryAllRoutes(
  client: SanityClient,
  type?: 'post' | 'question'
): Promise<StaleRoute[]> {
  let slugs = []

  if (type) {
    slugs = await _queryAllRoutes(client, type)
    return [
      '/',
      '/posts',
      '/questions',
      ...slugs.map((slug) => `/${type}s/${slug}` as StaleRoute),
    ]
  } else {
    slugs = await _queryAllRoutes(client)
    return ['/', '/posts', '/questions', ...slugs]
  }
}

async function mergeWithMoreStories(
  client,
  slugs: string[],
  type: 'post' | 'question'
): Promise<string[]> {
  const moreStories = await client.fetch(
    groq`*[_type == type] | order(date desc, _updatedAt desc) [0...3].slug.current`
  )
  if (slugs.some((slug) => moreStories.includes(slug))) {
    const allSlugs = await _queryAllRoutes(client, type)
    return [...new Set([...slugs, ...allSlugs])]
  }

  return slugs
}

async function queryStalePostRoutes(
  client: SanityClient,
  id: string
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "post" && _id == $id].slug.current`,
    { id }
  )

  slugs = await mergeWithMoreStories(client, slugs, 'post')

  return ['/', '/posts', ...slugs.map((slug) => `/posts/${slug}`)]
}

async function queryStaleQuestionRoutes(
  client: SanityClient,
  id: string
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "question" && _id == $id].slug.current`,
    { id }
  )

  slugs = await mergeWithMoreStories(client, slugs, 'question')

  return ['/', '/questions', ...slugs.map((slug) => `/questions/${slug}`)]
}
