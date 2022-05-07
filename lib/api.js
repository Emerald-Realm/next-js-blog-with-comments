import client, { previewClient } from './sanity'

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const getUniqueCategories = (categories) => {
  const titles = new Set()
  return categories.filter((category) => {
    if (titles.has(category.title)) {
      return false
    } else {
      titles.add(category.title)
      return true
    }
  })
}

const postFields = `
  _id,
  name,
  title,
  categories,
  'date': publishedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`

// const categoryFields = `
//   _id,
//   title,
//   'coverImage': image,
// `

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return data
}

export async function getAllCategoriesWithTitle() {
  const data = await client.fetch(`*[_type == "category"]{ title }`)
  return data
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getAllCategories(preview) {
  const query = `*[_type == "category"] {
    _id,
   title,
   image,
     }`;

  const categories = await client.fetch(query)
  return categories
}

export async function getAllAuthors() {
  const query = `*[_type == "author"] {
    bio,
    name,
    image,
    _id,
  }`;

  const authors = await client.fetch(query)
  return authors
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient.fetch(
      `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        'comments': *[
                      _type == "comment" && 
                      post._ref == ^._id && 
                      approved == true] {
          _id, 
          name, 
          email, 
          comment, 
          _createdAt
        }
      }`,
      { slug }
    )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...2]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}

export async function getCategoryAndMoreCategories(title, preview) {
  const curClient = getClient(preview)
  const [category, moreCategories] = await Promise.all([

    curClient.fetch(
      `*[_type == "post" && title.current == $title ] | order(_updatedAt desc) {
          _id, 
          title,
          email, 
        }
      }`,
      { title }
    )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "category" && title.current != $title] }[0...2]`,
      { title }
    ),
  ])
  return { category, moreCategories: getUniqueCategories(moreCategories) }
}
