import { imageBuilder } from '../lib/sanity'
import Link from 'next/link'

export default function CategoryPreview({ list }) {

  console.log(list)


  return (
    <>
      {
        list.map((category) => {
          const slug = category.title
          return (
            <div key={slug}>
              {/* <Link as={`/categories/${category.title}`} href="/categories/[category.title]"> */}
              <Link key={slug} as={`/categories/${slug}`} href="/categories/[slug]">
                <div key={slug} className='category-template shadow py-20 px-2 text-center grow min-w-[200px]'
                  style={{
                    backgroundImage: `url(${imageBuilder(category.image).url()})`,
                    backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                  }}>
                  <p className='link text-2xl font-bold text-blue-300'>{category.title}</p>
                </div>
              </Link>
            </div>
          )
        }
        )
      }
    </>
  )
}


