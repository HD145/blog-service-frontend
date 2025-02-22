import React from 'react'
import BlogView from '../../components/Blog/blog-view'
import { axiosPoint } from '../../common/config/axios'

const BlogPage = () => {
  return (
    <BlogView link ={axiosPoint.userBlogs}/>
  )
}

export default BlogPage
