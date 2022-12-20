import FoodPage from 'components/food/FoodPage'
import { getFood } from 'lib/my-food/getFood'

export default async function IndexRoute() {
  // Fetch queries in parallel
  const food = await getFood()

  // if (previewData()) {
  //   const token = previewData().token || null

  //   return (
  //     <PreviewSuspense
  //       fallback={
  //         <HomePage
  //           loading
  //           preview
  //           posts={posts}
  //           questions={questions}
  //           food={food}
  //           settings={settings}
  //         />
  //       }
  //     >
  //       <PreviewIndexPage token={token} />
  //     </PreviewSuspense>
  //   )
  // }

  return <FoodPage food={food} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
