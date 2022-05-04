import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import { getAllCategories } from '../lib/api'
import { getAllAuthors } from '../lib/api'
import Head from 'next/head'
import { imageBuilder } from '../lib/sanity'
import mascot from '../media/blend-one.png'
import Image from 'next/image'
import CategoryPreview from '../components/categoryPreview'


export default function Index({ allPosts, preview, categories, authors }) {

  console.log(allPosts)
  // console.log(categories)
  // console.log(authors)

  const morePosts = allPosts.slice(1)
  const recentPosts = allPosts.slice().sort()

  console.log(recentPosts)

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Feast with Freya</title>
        </Head>


        <Container>
          {/* bgimage + text + header + cta */}
          <div className='Hero section py-[10rem]' >
            <div className='context flex flex-col gap-4 max-w-lg px-4'>
              <h1 className='text-3xl'>Keep good food in your home, eat healthy and live healthy
                to be healthy and look healthy. <span className='font-cursive'>The Royal Lifestyle.</span></h1>
              <p className='text-xl'>Be worthy of a feast with the Queen</p>
              <button className='px-4 py-2 w-40 bg-black font-semi-bold text-white text-lg'>Get started</button>
            </div>
          </div>

          <div className='features section flex flex-col md:flex-row gap-4 justify-between'>
            <CategoryPreview list={categories} />
          </div>

          <div className='quote section bg-amber-500 text-center'>
            <blockquote className='text-white'>I'm a man of simple tastes. I'm always satisfied with the best.</blockquote>
            <p className='text-amber-900'>― Oscar Wilde</p>
          </div>

          <div className='featured section p-4'>
            <h2>Featured Posts</h2>
            <div>
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </div>
          </div>

          <div className='recent section'>
            <h2>Checkout Our Recent Posts</h2>
            <div>
              {morePosts.length > 0 && <MoreStories posts={recentPosts} />}
            </div>
          </div>

          <div className='about section md:flex'>
            <Image src={mascot} alt='brand face' />
            <div className='context'>
              <h2>About us</h2>
              <p>evolve with us and feast with the royals</p>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  const categories = await getAllCategories(preview)
  const authors = await getAllAuthors()
  return {
    props: { allPosts, preview, categories, authors },
    revalidate: 1
  }
}
