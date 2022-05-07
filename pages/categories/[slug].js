// import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { getAllCategories } from '../../lib/api'
import { getAllPostsForHome } from '../../lib/api'
import { getAllCategoriesWithTitle } from '../../lib/api'
import { getCategoryAndMoreCategories } from '../../lib/api'
// import category from '../../studio/schemas/category'



export default function Category({ allPosts, categories}) {
  const router = useRouter()
  console.log(allPosts[0])
  console.log(categories)

  let pageTitle = router.query.slug

  const pageId = categories.find(category => {
    return category.title == pageTitle
  })

  console.log(pageId)
  // console.log(category.title)

  // filter array by slug.
  // if (!router.isFallback && !category?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }
  
  return (
    <div>
      <h1>{router.query.slug}</h1>
      {/* list of arrays */}
      blank page
    </div>
  )
}

export async function getStaticProps({ params, preview = false }) {
  // const data = await getCategoryAndMoreCategories(params.slug, preview)
  const categories = await getAllCategories(preview)
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { 
      // category: data?.category || null,
      // moreCategories: data?.moreCategories || null,
      allPosts, preview,categories},
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allCategories = await getAllCategoriesWithTitle()
  return {
    paths:
      allCategories?.map((category) => ({
        params: {
          slug: category.title,
        },
      })) || [],
    fallback: true,
  }
}

