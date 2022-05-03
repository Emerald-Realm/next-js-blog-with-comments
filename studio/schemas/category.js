import { TagIcon } from '@sanity/icons'

export default {
  name: 'category',
  title: 'Category',
  icon: TagIcon,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    // {
    //   name: 'posts',
    //   title: 'Posts',
    //   type: 'array',
    //   of: [{ type: 'reference', to: { type: 'post' } }]
    // }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}
